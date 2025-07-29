import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { usuarioRepository } from "../../services/usuario.repository.js";
import { Usuario, UsuarioPostSchema } from "../../types/schemas/usuario.js";

const usuariosRoutes: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener listado de usuarios",
      description: "Obtener listado de usuarios",
      security: [{ bearerAuth: [] }],
      response: { 200: Type.Array(Usuario) },
    },
    onRequest: fastify.verifyAdmin,
    handler: async function (request, reply) {
      return usuarioRepository.getAll();
    },
  });

  fastify.post("/", {
    schema: {
      tags: ["usuarios"],
      summary: "Crear usuario",
      description: "Crear usuario",
      body: UsuarioPostSchema,
      security: [{ bearerAuth: [] }],
      response: {
        201: UsuarioPostSchema,
      },
    },
    onRequest: fastify.verifyAdmin,
    handler: async function (request, reply) {
      const user = await usuarioRepository.create(UsuarioPostSchema);
      reply.status(201).send(user);
    },
  });
};

export default usuariosRoutes;
