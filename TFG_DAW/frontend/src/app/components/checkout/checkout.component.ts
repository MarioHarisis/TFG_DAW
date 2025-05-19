import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { AlertasService } from '../../services/alertas.service';
import { Reserva } from '../../model/Reserva';
import { Espacio } from '../../model/Espacio';
import { EspacioService } from '../../services/espacio.service';
import { Usuario } from '../../model/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  espacio!: Espacio;
  usuario!: Usuario;
  metodoPago: string = '';
  fechaFormateada: string = '';
  horaFormateada: string = '';

  constructor(
    private router: Router,
    private reservaService: ReservaService,
    private alertasService: AlertasService,
    private espacioService: EspacioService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    // obtener datos de la reserva en Service
    const datosReserva = this.reservaService.getReserva();

    if (datosReserva) {
      // formatear fecha y confirmación
      this.fechaFormateada =
        datosReserva.fechaDeReserva.toLocaleDateString('es-ES');
      this.horaFormateada = datosReserva.fechaDeReserva.toLocaleTimeString(
        'es-ES',
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      );

      // obtener espacio por ID del API
      this.espacioService
        .obtenerEspacioId(datosReserva?.espacioId)
        .subscribe((espacio) => {
          this.espacio = espacio;
        });

      // obtener usuario por ID del API
      this.usuarioService
        .obtenerUsuarioId(datosReserva?.usuarioId)
        .subscribe((usuario) => {
          this.usuario = usuario;
        });
    } else {
      console.log(
        'No se pudieron obtener los datos de reserva desde el service'
      );
      this.router.navigate(['/home']);
    }
  }

  // cuando el usuario selecciona método de pago
  irAlPago() {
    // metodo de pago NO seleccionado
    if (!this.metodoPago) {
      this.alertasService.error('Debes seleccionar un método de pago');
      return;
    }
    // Redirigir con el método de pago en la URL
    this.router.navigate(['/payment', this.metodoPago]);
  }
}
