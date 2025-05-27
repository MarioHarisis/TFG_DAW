export class Reserva {
  public id?: number;

  constructor(
    public fecha: Date,
    public estado: string,
    public usuarioId: number, // Sólo el ID del Usuario
    public espacioId: number // Sólo el ID del Espacio
  ) {}
}
