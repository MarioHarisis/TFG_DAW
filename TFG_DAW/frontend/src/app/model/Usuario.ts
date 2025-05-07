import { Reserva } from "./Reserva";

export interface Usuario {
      id: number,
      nombre: string,
      email: string,
      password: string,
      rol: string,
      reservas: Reserva[];
  }