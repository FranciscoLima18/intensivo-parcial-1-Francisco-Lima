import { Static, Type } from "@sinclair/typebox";

export const DepartamentoSchema = Type.Object({
  id_departamento: Type.Integer(),
  nombre: Type.String(),
});
export const DepartamentoParams = Type.Object({
  id_departamento: Type.Integer(),
});

export type DepartamentoParams = Static<typeof DepartamentoParams>;
export type DepartamentoSchema = Static<typeof DepartamentoSchema>;
