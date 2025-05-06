export class Reserva {
    constructor(
      public id: number,
      public fechaInicio: string,
      public fechaFin: string,
      public estado: string,
      public usuarioId: number,  // Sólo el ID del Usuario
      public espacioId: number   // Sólo el ID del Espacio
    ) {}
  }
  