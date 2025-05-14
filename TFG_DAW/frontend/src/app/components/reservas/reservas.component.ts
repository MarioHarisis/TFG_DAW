import { Component, EventEmitter, Output, ViewEncapsulation   } from '@angular/core';

@Component({
  selector: 'app-reservas',
  standalone: false,
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ReservasComponent {

  minDate: Date = new Date(); // fecha de hoy
  selectedDate: Date = new Date(); // Fecha seleccionada del calendario
  horaSeleccionada: string = ''; // Hora seleccionada del select
  horasDisponibles: string[] = []; // Lista de horas disponibles

  @Output() dateTimeSelected = new EventEmitter<Date>();  // Evento para emitir la fecha y hora combinada
  
  constructor() {
    this.generarHorasDisponibles(); // Inicializar la lista de horas
  }

  // Genera una lista de horas de 00:00 a 00:00
  private generarHorasDisponibles(): void {
    const horas = [];
    for (let h = 0; h <= 23; h++) {
      for (let m = 0; m < 60; m += 30) { // Cada 30 minutos
        const hour = (h < 10 ? '0' + h : h);
        const minute = (m === 0 ? '00' : '30');
        horas.push(`${hour}:${minute}`);
      }
    }
    this.horasDisponibles = horas;
  }

  // Cada vez que se selecciona una nueva fecha en el calendario
  onDateChange(event: Date): void {
    this.selectedDate = event;
    this.emitDateTime(); // Emitir la fecha y hora cada vez que cambie la fecha
  }

  // Cada vez que se selecciona una nueva hora
  onTimeChange(event: any): void {
    this.horaSeleccionada = event.target.value; // Obtener la hora seleccionada
    this.emitDateTime(); // Emitir la fecha y hora cada vez que cambie la hora
  }

  // Combina la fecha seleccionada y la hora seleccionada en un solo objeto Date
  private emitDateTime(): void {
    if (this.selectedDate && this.horaSeleccionada) {
      const [hours, minutes] = this.horaSeleccionada.split(':');
      const dateTime = new Date(this.selectedDate);
      dateTime.setHours(Number(hours));
      dateTime.setMinutes(Number(minutes));
      this.dateTimeSelected.emit(dateTime); // Emitir el objeto Date combinado
    }
  }
}
