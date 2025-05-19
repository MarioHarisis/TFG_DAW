import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../model/Reserva';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = `${environment.apiBaseUrl}/reservas`; // URL del API
  private datosDeReserva: {
    usuarioId: number;
    espacioId: number;
    fechaDeReserva: Date;
  } | null = null;

  constructor(private http: HttpClient) {}

  setReserva(data: {
    usuarioId: number;
    espacioId: number;
    fechaDeReserva: Date;
  }) {
    this.datosDeReserva = data;
  }

  getReserva() {
    return this.datosDeReserva;
  }

  clearReserva() {
    this.datosDeReserva = null;
  }

  crearReserva(reservaDto: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reservaDto);
  }
}
