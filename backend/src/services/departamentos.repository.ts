import { DepartamentoSchema } from "../types/schemas/departamento.js";
import { UCUNoEncontradoError } from "../util/index.js";
import { BaseRepository } from "./base.repository.js";
import { myPool } from "./database.service.js";

class DepartamentoRepository extends BaseRepository<DepartamentoSchema> {
  baseQuery = `SELECT * FROM public.departamentos WHERE true `;

  async getAll(): Promise<DepartamentoSchema[]> {
    const res = await myPool.query(`${this.baseQuery}`);
    return res.rows;
  }

  async getById(id: number): Promise<DepartamentoSchema> {
    let consulta = `${this.baseQuery} AND id_departamento=$1`;
    const res = await myPool.query(consulta, [id]);
    if (res.rowCount === 0)
      throw new UCUNoEncontradoError("id_departamento " + id);
    return res.rows[0];
  }

  getOneBy(
    data: Partial<{ id_departamento: number; nombre: string }>
  ): Promise<{ id_departamento: number; nombre: string }> {
    throw new Error("Method not implemented.");
  }
  findAll(
    data: Partial<{ id_departamento: number; nombre: string }>
  ): Promise<{ id_departamento: number; nombre: string }[]> {
    throw new Error("Method not implemented.");
  }
  create(data: {
    id_departamento: number;
    nombre: string;
  }): Promise<{ id_departamento: number; nombre: string }> {
    throw new Error("Method not implemented.");
  }

  async update(
    id: string,
    data: Partial<DepartamentoSchema>
  ): Promise<DepartamentoSchema> {
    throw new Error("Not implemented");
  }

  async erase(id: number): Promise<void> {
    throw new Error("Not implemented");
  }

  async getLocalidades(id_departamento: number) {
    const depto = await this.getById(id_departamento);
    const urlLocalidades =
      "https://direcciones.ide.uy/api/v0/geocode/localidades?alias=false&departamento=" +
      depto.nombre;
    const response = await fetch(urlLocalidades);
    const localidades = (await response.json()) as any[];
    console.log({ localidades });
    return localidades.map((l) => {
      return {
        id_localidad: l.id,
        nombre: l.nombre,
        id_departamento: depto.id_departamento,
      };
    });
  }
}

export const departamentoRepository = new DepartamentoRepository();
