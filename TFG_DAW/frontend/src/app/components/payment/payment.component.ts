import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../model/Reserva';
import { ReservaService } from '../../services/reserva.service';
import { AlertasService } from '../../services/alertas.service';
import { EspacioService } from '../../services/espacio.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  espacioId!: number;
  metodoPago!: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private reservaService: ReservaService,
    private alertasService: AlertasService,
    private espacioService: EspacioService,
    private usuarioService: UsuarioService
  ) {}

  // obtener valor desde la url para saber que componente mostrar
  ngOnInit(): void {
    this.metodoPago = this.route.snapshot.paramMap.get('metodoPago') || '';

    // Ejemplo de lógica condicional
    if (this.metodoPago === 'tarjeta') {
      // mostrar formulario de tarjeta
    } else if (this.metodoPago === 'ethereum') {
      // mostrar QR o wallet
    }
  }

  // cuando uno de los dos componentes (tarjeta/eth) confirme
  confirmarPago() {
    const datosReserva = this.reservaService.getReserva();

    if (datosReserva) {
      const fecha = datosReserva.fechaDeReserva;
      const reservaDto = {
        fecha: fecha,
        estado: 'CONFIRMADO',
        usuarioId: datosReserva.usuarioId,
        espacioId: datosReserva.espacioId,
      };
      // crear la nueva reserva
      this.reservaService.crearReserva(reservaDto).subscribe({
        next: () => {
          this.alertasService.alertaPers(
            'success',
            'Reserva confirmada',
            'Se ha completado correctamente',
            false,
            '/home'
          );
        },
        error: () => {
          this.alertasService.error('Error al registrar la reserva');
        },
      });
    }
  }
}
