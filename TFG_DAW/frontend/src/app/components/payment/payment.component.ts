import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-payment",
  standalone: false,
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.css",
})
export class PaymentComponent {
  metodoPago!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.metodoPago = params["metodoPago"]; // obtener metodo de pago desde checkout
    });
  }

  confirmarPago() {
    throw new Error("Method not implemented.");
  }
}
