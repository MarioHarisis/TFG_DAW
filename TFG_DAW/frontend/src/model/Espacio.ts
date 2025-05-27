import { Reserva } from "./Reserva";

export class Espacio {
  id!: number;

  constructor(
    public nombre: string,
    public descripcion: string,
    public categoria:string,
    public ubicacion: string,
    public capacidad: number,
    public precio: number | null,
    public disponible: boolean,
    public imagen: string,
    public usuarioId: number,
    public reservas?: Reserva[]  // Aquí agregamos la lista de reservas
  ) {}
  
}
