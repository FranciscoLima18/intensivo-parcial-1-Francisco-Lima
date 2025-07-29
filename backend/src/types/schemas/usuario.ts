import { Required, Static, Type } from "@sinclair/typebox";
import fp from "fastify-plugin";

export const Login = Type.Object(
  {
    usuario: Type.String(),
    password: Type.String(),
  },
  {
    examples: [
      {
        usuario: "admin",
        password: "contraseña",
      },
      {
        usuario: "usuario1",
        password: "contraseña",
      },
      {
        usuario: "usuario2",
        password: "contraseña",
      },
    ],
  }
);

export const UsuarioParams = Type.Object({
  id_usuario: Type.Optional(Type.Integer()),
});

export type UsuarioParamsType = Static<typeof UsuarioParams>;

export type Login = Static<typeof Login>;

export const Usuario = Type.Object({
  id_usuario: Type.Integer(),
  nombre: Type.String(),
  roles: Type.Array(Type.Object({ id: Type.String() })),
});
export type Usuario = Static<typeof Usuario>;

export const UsuarioPostSchema = Type.Object({
  id_usuario: Type.Object({
    nombre: Type.String({ minLength: 3, maxLength: 10 }),
    roles: Type.Array(Type.Object({ id: Type.String() })),
  }),
});

export type UsuarioPostType = Static<typeof UsuarioPostSchema>;

//Si quiero agregar los esquemas a fastify de antemano para poder usar ref.
export default fp(async (fastify) => {
  fastify.addSchema(Login);
});
