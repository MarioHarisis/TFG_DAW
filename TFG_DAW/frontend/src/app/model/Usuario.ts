import { Reserva } from "./Reserva";

export class Usuario {
    constructor(
      public id: number,
      public nombre: string,
      public email: string,
      public password: string,
      public rol: string,
      public reservas: Reserva[] = []
    ) {}
  }