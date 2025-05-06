import { Reserva } from "./Reserva";

export class Espacio {
  id?: number;

  constructor(
    public nombre: string,
    public ubicacion: string,
    public descripcion: string,
    public capacidad: number,
    public precio: number,
    public disponible: boolean,
    public imagen: string,
    public reservas: Reserva[]  // Aquí agregamos la lista de reservas
  ) {}
  
}
