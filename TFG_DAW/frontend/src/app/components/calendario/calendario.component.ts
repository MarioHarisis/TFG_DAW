import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendario',
  standalone: false,
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {
   minDate: Date = new Date(); // fecha de hoy
  selectedDate: Date = new Date(); // Fecha seleccionada del calendario
  horaSeleccionada: string = ''; // Hora seleccionada del select
  horasDisponibles: string[] = []; // Lista de horas disponibles

  reservas = [
    { fecha: '2025-05-20', hora: '10:00', tipo: 'Coworking', estado: 'confirmada' },
    { fecha: '2025-05-22', hora: '15:30', tipo: 'Oficina privada', estado: 'confirmada' },
    { fecha: '2025-05-25', hora: '09:00', tipo: 'Sala de reuniones', estado: 'pendiente' },
  ];

  @Output() dateTimeSelected = new EventEmitter<Date>();  // Evento para emitir la fecha y hora combinada

  constructor() {
    this.generarHorasDisponibles(); // Inicializar la lista de horas
  }

  // Genera una lista de horas de 00:00 a 23:30 cada 30 minutos
  private generarHorasDisponibles(): void {
    const horas = [];
    for (let h = 0; h <= 23; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = (h < 10 ? '0' + h : h);
        const minute = (m === 0 ? '00' : '30');
        horas.push(`${hour}:${minute}`);
      }
    }
    this.horasDisponibles = horas;
  }

  // Evento al seleccionar fecha en el calendario
onDateChange(event: Date | null): void {
  if (event) {
    this.selectedDate = event;
    this.emitDateTime();
  }
}

  // Evento al seleccionar hora
  onTimeChange(event: any): void {
    this.horaSeleccionada = event.target.value;
    this.emitDateTime();
  }

  // Emitir fecha y hora combinadas
  private emitDateTime(): void {
    if (this.selectedDate && this.horaSeleccionada) {
      const [hours, minutes] = this.horaSeleccionada.split(':');
      const dateTime = new Date(this.selectedDate);
      dateTime.setHours(Number(hours));
      dateTime.setMinutes(Number(minutes));
      this.dateTimeSelected.emit(dateTime);
    }
  }

  // Marca los días que ya tienen reservas en el calendario
  getDateClass = (date: Date): string => {
    const reservadas = this.reservas.map(r => new Date(r.fecha).toDateString());
    return reservadas.includes(date.toDateString()) ? 'dia-reservado' : '';
  };

  editarReserva(reserva: any): void {
  console.log('Editar reserva:', reserva);
  // Aquí puedes abrir un modal o redirigir a un formulario
}

eliminarReserva(reserva: any): void {
  console.log('Eliminar reserva:', reserva);
  // Aquí podrías mostrar confirmación y luego eliminar del array
  this.reservas = this.reservas.filter(r => r !== reserva);
}
}
