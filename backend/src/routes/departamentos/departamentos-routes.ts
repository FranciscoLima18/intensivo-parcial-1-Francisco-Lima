import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { departamentoRepository } from "../../services/departamentos.repository.js";
import {
  DepartamentoParams,
  DepartamentoSchema,
} from "../../types/schemas/departamento.js";
import { Type } from "@sinclair/typebox";
import {
  UsuarioParams,
  UsuarioParamsType,
} from "../../types/schemas/usuario.js";
import { usuarioRepository } from "../../services/usuario.repository.js";

const departamentoRoutes: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      tags: ["departamentos"],
      summary: "Obtener listado de departamentos",
      description: "Obtener listado de departamentos",
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(DepartamentoSchema),
      },
    },
    onRequest: fastify.verifyAdmin,
    handler: async function (request, reply) {
      const list = await departamentoRepository.getAll();
      reply.send(list);
    },
  });

  fastify.get("/:id_departamento/localidades", {
    schema: {
      tags: ["departamentos"],
      params: DepartamentoParams,
      summary: "Obtener listado de departamentos",
      description: "Obtener listado de departamentos",
      security: [{ bearerAuth: [] }],
      response: {
        200: Type.Array(DepartamentoSchema),
      },
    },
    onRequest: fastify.verifyAdmin,
    handler: async function (request, reply) {
      const { id_departamento } = request.params as DepartamentoParams;
      const departamentos = await departamentoRepository.getLocalidades(
        id_departamento
      );
      return departamentos;
    },
  });

  fastify.get("/:id_usuario", {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener deptos usuario",
      params: UsuarioParams,
      description: "Obtener departamentos del usuario",
      security: [{ bearerAuth: [] }],
      response: { 200: Type.Array(DepartamentoSchema) },
    },
    onRequest: fastify.verifySelfOrAdmin,
    handler: async function (request, reply) {
      const { id_usuario } = request.params as UsuarioParamsType;

      const departamentos = await usuarioRepository.getDepartamentos(
        id_usuario
      );
      return departamentos;
    },
  });
};

export default departamentoRoutes;
