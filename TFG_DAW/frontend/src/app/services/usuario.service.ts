import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../model/Usuario';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.apiBaseUrl}/usuarios`;  // URL del API

  constructor(private http: HttpClient) { }

  /* Solicitudes que se envían al UsuarioController */

    // Obtener todos los usuarios
    getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl);
    }

    // solicitud de login de usuario
    login(email: string, password: string): Observable<Usuario>{
      return this.http.post<Usuario>(`${this.apiUrl}/login`, {email, password});
    }

    // solicitud de registro de usuario
    registro(usuario : Usuario){
      return this.http.post(`${this.apiUrl}/registro`, usuario );
    }

    // solicitud de logout de usuario
    logout() {
      return this.http.post(`${this.apiUrl}/logout`, {});
    }
}
