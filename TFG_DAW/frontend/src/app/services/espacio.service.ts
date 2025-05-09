import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Espacio } from '../model/Espacio';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspacioService {

  private apiUrl = `${environment.apiBaseUrl}/espacios`;  // URL del API
  private espaciosEnService: Espacio [] = [];

  constructor(private http: HttpClient) { }

  // Método para enviar un espacio al backend
  // Enviar un nuevo espacio con imagen
  crearEspacio(espacio: Espacio, imagen: File): Observable<Espacio> {
    const formData = new FormData();
    formData.append('nombre', espacio.nombre);
    formData.append('descripcion', espacio.descripcion);
    formData.append('categoria', espacio.categoria);
    formData.append('ubicacion', espacio.ubicacion);
    formData.append('precio', Number(espacio.precio).toString());
    formData.append('capacidad', Number (espacio.capacidad).toString());
    formData.append('disponible', espacio.disponible ? 'true' : 'false');
    formData.append('imagen', imagen);
    formData.append('usuarioId', espacio.usuarioId.toString());

    return this.http.post<Espacio>(this.apiUrl, formData);
  }

    // Obtener todos los espacios
    obtenerEspacios(): Observable<Espacio[]> {
      return this.http.get<Espacio[]>(this.apiUrl);
    }

    // obtener espacio desde el back por id
    obtenerEspacioId(id : number): Observable<Espacio> {
      const url = `${this.apiUrl}/${id}`; // url que hará la peticion GET al mapeo en back
      return this.http.get<Espacio>(url);
    }

    // eliminar un espacio por su ID
    eliminarEspacio(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`); // @DeleteMapping DELETE /espacios/{id}
    }

    // solicitud de todos los espacios pasando id del usuario
    obtenerEspaciosPorUsuario(id: number): Observable<Espacio[]> {
      return this.http.get<Espacio[]>(`${this.apiUrl}/usuarios/${id}`);
    }


  // GETTER N SETTER
  set espacios(espacios: Espacio[]) {
    this.espaciosEnService = espacios;
  }
  
  get espacios(): Espacio[]{
    return this.espaciosEnService;
  }
}
