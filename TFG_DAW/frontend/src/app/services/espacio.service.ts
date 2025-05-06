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

  constructor(private http: HttpClient) { }

  // Método para enviar un espacio al backend
  // Enviar un nuevo espacio con imagen
  crearEspacio(espacio: Espacio, imagen: File): Observable<Espacio> {
    const formData = new FormData();
    formData.append('nombre', espacio.nombre);
    formData.append('descripcion', espacio.descripcion);
    formData.append('ubicacion', espacio.ubicacion);
    formData.append('precio', espacio.precio.toString());
    formData.append('capacidad', espacio.capacidad.toString());
    formData.append('disponible', espacio.disponible ? 'true' : 'false');
    formData.append('imagen', imagen);

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
}
