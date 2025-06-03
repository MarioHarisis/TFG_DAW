import { Component, EventEmitter, Output } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../model/Reserva';
import { EspacioService } from '../../services/espacio.service';
import { AuthService } from '../../services/auth.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AlertasService } from '../../services/alertas.service';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-calendario',
  standalone: false,
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent {
  minDate: Date = new Date(); // fecha de hoy
  horaSeleccionada: string = ''; // Hora seleccionada del select
  horasDisponibles: string[] = []; // Lista de horas disponibles

  reservas: Reserva[] = [];
  selectedDate: Date | null = null;

  usuario!: any;
  espacio!: any;

  reservaEditando: Reserva | null = null;

  @Output() dateTimeSelected = new EventEmitter<Date>(); // Evento para emitir la fecha y hora combinada

  constructor(
    private reservaService: ReservaService,
    private espacioService: EspacioService,
    private authService: AuthService,
    private alertasService: AlertasService
  ) {}

  ngOnInit(): void {
    // obtener usuario actual
    this.usuario = this.authService.getUsuario();

    if (this.usuario) {
      // obtener reservas del usuario
      this.reservaService
        .obtenerReservasPorUsuario(this.usuario.id)
        .subscribe((reservas) => {
          this.reservas = reservas;
          console.log('Reservas recibidas:', this.reservas);
          this.reservas.forEach((reserva) => {
            this.espacioService
              .obtenerEspacioId(reserva.espacioId)
              .subscribe((e) => (this.espacio = e));
          });
        });
    }
  }

  // Marca los días que ya tienen reservas en el calendario
  getDateClass = (date: Date): string => {
    const reservadas = this.reservas.map((r) =>
      new Date(r.fecha).toDateString()
    );
    return reservadas.includes(date.toDateString()) ? 'dia-reservado' : '';
  };

  // Evento al seleccionar fecha en el calendario
  onDateChange(event: Date | null): void {
    if (event) {
      this.selectedDate = event;
      this.emitDateTime();
    }
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

  editarReserva(reserva: any): void {
    console.log('Editar reserva:', reserva);
    // Aquí puedes abrir un modal o redirigir a un formulario
  }

  // eliminar un espacio por su ID
  eliminarReserva(reserva: any): void {
    // aviso de seguridad para eliminar Espacios
    this.alertasService
      .alertaPers(
        'warning',
        '¿Cancelar esta reserva?',
        'Se cancelará esta reserva',
        true,
        ''
      )
      .then((confirmado: boolean) => {
        // alertaPers devuelve un Promise<boolean>
        // si recibimos true, eliminar
        if (confirmado) {
          // eliminar Espacio
          this.reservaService.eliminarReserva(reserva.id).subscribe({
            next: () => {
              // informar de Espacio eliminado
              this.alertasService
                .alertaPers(
                  'success',
                  'Reserva cancelada correctamente',
                  '',
                  false,
                  ''
                )
                .then(() => window.location.reload()); // recargar la página
            },
            error: () => {
              // si ocurre algún error durante la eliminacióm
              this.alertasService.alertaPers(
                'error',
                'No se pudo eliminar la Reserva',
                '',
                false,
                ''
              );
            },
          });
        } // no hacer nada si se cancela la eliminación del Espacio
      });
  }

  // guardar la reserva editada
  guardarEdicion(): void {
    if (this.reservaEditando) {
      this.reservaService
        .editarReserva(this.reservaEditando.id!, this.reservaEditando)
        .subscribe({
          next: () => {
            this.alertasService.alertaPers(
              'success',
              'Reserva actualizada',
              '',
              false,
              ''
            );
            this.reservaEditando = null;
            this.ngOnInit(); // recargar reservas
          },
          error: () => {
            this.alertasService.alertaPers(
              'error',
              'Error al actualizar',
              '',
              false,
              ''
            );
          },
        });
    }
  }
}
