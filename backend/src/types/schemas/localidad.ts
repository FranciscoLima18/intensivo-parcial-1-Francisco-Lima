import { Static, Type } from "@sinclair/typebox";

export const Localidad = Type.Object({
  id_localidad: Type.Integer(),
  id_departamento: Type.Integer(),
  nombre: Type.String(),
});
export type Localidad = Static<typeof Localidad>;

export const LocalidadParams = Type.Object({
  id_localidad: Type.Integer(),
});

export type LocalidadParams = Static<typeof LocalidadParams>;

export const LocalidadUsuario = Type.Object(
  {
    id_localidad: Type.Integer(),
    id_departamento: Type.Integer(),
    id_usuario: Type.Integer(),
    nombre: Type.String(),
    departamento: Type.Optional(Type.String()),
    usuario: Type.Optional(Type.String()),
  },
  {
    examples: [
      {
        id_localidad: 698,
        id_departamento: 2,
        id_usuario: 2,
        nombre: "AEROPUERTO INTERNACIONAL DE CARRASCO",
      },
      {
        id_localidad: 36,
        id_departamento: 2,
        id_usuario: 2,
        nombre: "ARAMINDA",
      },

      {
        id_localidad: 1037,
        id_departamento: 15,
        id_usuario: 3,
        nombre: "ALBISU",
      },
      {
        id_localidad: 1041,
        id_departamento: 15,
        id_usuario: 3,
        nombre: "ARENITAS BLANCAS",
      },
    ],
  }
);
export type LocalidadUsuario = Static<typeof LocalidadUsuario>;
