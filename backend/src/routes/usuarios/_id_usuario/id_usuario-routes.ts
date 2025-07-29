import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import {
  Usuario,
  UsuarioParams,
  UsuarioParamsType,
} from "../../../types/schemas/usuario.js";
import { usuarioRepository } from "../../../services/usuario.repository.js";
import { UCUErrorNotFound } from "../../../util/index.js";
import { Localidad } from "../../../types/schemas/localidad.js";

const usuariosRoutes: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener usuario",
      params: UsuarioParams,
      description: "Obtener el usuario a partir de su id",
      security: [{ bearerAuth: [] }],
      response: { 200: Usuario },
      404: { description: "Usuario no encontrado" },
    },
    onRequest: fastify.verifySelfOrAdmin,
    handler: async function (request, reply) {
      const { id_usuario } = request.params as UsuarioParamsType;
      const user = await usuarioRepository.getById(id_usuario);
      if (!user) {
        throw new UCUErrorNotFound(`Usuario ${id_usuario} no encontrado`);
      }
    },
  });

  fastify.get("/departamentos/:id_departamento/localidades", {
    schema: {
      tags: ["usuarios"],
      summary: "Localidades usuario.",
      description:
        "Obtener las localidades de un determinado departamento del usuario",
      security: [{ bearerAuth: [] }],
      // params: [LocalidadParams, DepartamentoParams],
      response: {
        200: Type.Array(Localidad),
      },
    },
    onRequest: fastify.verifySelfOrAdmin,
    handler: async function (request, reply) {
      throw new Error("No implementado");
    },
  });

  fastify.post("/departamentos/:id_departamento/localidades", {
    schema: {
      tags: ["usuarios"],
      summary: "Crear Localidad",
      description: "Crear una localidad asignada a un usuario.",
      security: [{ bearerAuth: [] }],
      // params: [LocalidadParams, DepartamentoParams],
    },
    onRequest: fastify.verifyAdmin,
    handler: async function (request, reply) {
      throw new Error("No implementado");
    },
  });

  fastify.delete("/departamentos/:id_departamento/localidades/:id_localidad", {
    schema: {
      tags: ["usuarios"],
      summary: "Borrar localidad",
      description: "Borrar localidad.",
      security: [{ bearerAuth: [] }],
      // params: [LocalidadParams, DepartamentoParams],
      response: {
        204: { type: "null" },
      },
    },
    onRequest: fastify.verifyAdmin,
    handler: async function (request, reply) {
      // const { id_departamento } = request.params as DepartamentoParams;
      // const { id_localidad } = request.params as LocalidadParams;
      reply.code(204).send();
    },
  });
};

export default usuariosRoutes;
