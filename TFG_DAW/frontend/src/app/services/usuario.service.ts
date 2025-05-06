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

    // Obtener todos los usuarios
    getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl);
    }

    login(email: string, password: string){
      return this.http.post(`${this.apiUrl}/login`, {email, password});
    }

    registro(usuario : Usuario){
      return this.http.post(`${this.apiUrl}/registro`, usuario );
    }

    logout() {
      return this.http.post(`${this.apiUrl}/logout`, {});
    }
}
