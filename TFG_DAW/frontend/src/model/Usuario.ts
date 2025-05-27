import { Reserva } from "./Reserva";

export class Usuario {
  id!: number;

  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public rol: string,
    public reservas?: Reserva[] // Aquí agregamos la lista de reservas
  ) {}
}
