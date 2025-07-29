import fp from "fastify-plugin";
import jwt, { FastifyJWTOptions } from "@fastify/jwt";
import { UCUError } from "../util/index.js";
import { FastifyReply, FastifyRequest } from "fastify";
import authenticateFunction from "../types/fastify.js";

const jwtOptions: FastifyJWTOptions = {
  secret: process.env.FASTIFY_SECRET || "",
};

const jwtPlugin = fp<FastifyJWTOptions>(async (fastify) => {
  if (!jwtOptions.secret) {
    throw new UCUError("There's not a JWT secret");
  }

  fastify.register(jwt, jwtOptions);

  // Verificar el token JWT en cada solicitud
  const authenticate: authenticateFunction = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const url = request.routeOptions.url;
    if (url === "/auth/login") {
      return;
    }
    await request.jwtVerify();
  };

  // --- 2) Sólo Admin puede pasar ---
  const verifyAdmin: authenticateFunction = async (request, reply) => {
    await request.jwtVerify();
    const { id_usuario, roles } = request.user as {
      id_usuario: number;
      roles: string[];
    };

    if (roles.includes("1")) {
      return reply.code(403).send({
        error: `Forbidden: Admin only, role: ${roles}, info: ${id_usuario}`,
      });
    }
  };

  // --- 5) El propio usuario o un Admin ---
  const verifySelfOrAdmin: authenticateFunction = async (request, reply) => {
    await request.jwtVerify();
    const { id_usuario: targetId } = request.params as { id_usuario: number };
    const { id } = request.user as { id: number };

    if (id === targetId) {
      return; // es el mismo usuario
    }
    try {
      fastify.verifyAdmin(request, reply);
    } catch (error) {
      reply.code(403).send({
        error: `Forbidden: Admin or Owneronly, info: ${id}`,
      });
    }
  };

  // Registrar los métodos de autenticación
  fastify.decorate("authenticate", authenticate);
  fastify.decorate("verifyAdmin", verifyAdmin);
  fastify.decorate("verifySelfOrAdmin", verifySelfOrAdmin);
});
export default jwtPlugin;
