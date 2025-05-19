import { Component, EventEmitter, Output } from '@angular/core';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-tarjeta',
  standalone: false,
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css',
})
export class TarjetaComponent {
  cvc!: number;
  numero!: number;
  nombre!: string;
  expDate: any;

  @Output() pagoConfirmado = new EventEmitter<void>();

  constructor(private alertasService: AlertasService) {}

  procesarPago() {
    if (
      this.cvc === undefined ||
      this.numero === undefined ||
      this.nombre.trim() === ''
    ) {
      this.alertasService.error('Debes completar todos los campos');
      return;
    }

    // todo rellenado
    this.pagoConfirmado.emit(); // comunicar a payment que el pago ha sido procesado
  }
}
