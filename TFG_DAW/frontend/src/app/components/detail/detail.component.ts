import { Component } from "@angular/core";
import { EspacioService } from "../../services/espacio.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Espacio } from "../../model/Espacio";
import { AlertasService } from "../../services/alertas.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-detail",
  standalone: false,
  templateUrl: "./detail.component.html",
  styleUrl: "./detail.component.css",
})
export class DetailComponent {
  espacio: Espacio = new Espacio("", "", "", "", 0, 0, true, "", 0, []);
  private espaciosCategoria: Espacio[] = [];
  // Calendario
  mostrarCalendario: boolean = false;
  fechaDeReserva!: Date;

  // ActivatedRoute nos da acceso a la información de la ruta activa
  constructor(
    private espacioService: EspacioService,
    private route: ActivatedRoute,
    private alertasService: AlertasService,
    private authService: AuthService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      /* de la ruta activa obtenemos el numero ID depués lo usamos como var
    para buscar entre la lista de espacios. */
      const idEspacioUrl = params["id"];
      const encontrado = this.espacioService.espacios.find((e) => e.id == idEspacioUrl);

      if (encontrado) {
        this.espacio = encontrado;
        this.espaciosCategoria = espacioService.espacios.filter(
          (e) => e.categoria == encontrado?.categoria && e.id != encontrado.id
        );
      }
    });
  }

  // padre.component.ts
  handleDateTime(dateTime: Date): void {
    this.fechaDeReserva = dateTime;
    // guardar la fecha complpeta
  }

  reservar() {
    // primer click
    if (!this.mostrarCalendario) {
      this.mostrarCalendario = true;
    } else {
      // comprobar logeo
      if (this.authService.estaLogeado()) {
        // comprobar fecha establecida
        if (this.fechaDeReserva) {
          // formatear fecha para alert
          const fechaFormateada = this.fechaDeReserva.toLocaleDateString("es-ES");
          const horaFormateada = this.fechaDeReserva.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          });
          this.alertasService.alertaPers(
            "question",
            "¿Confirmar reserva?",
            `Se reservará el ${fechaFormateada} a las ${horaFormateada}`,
            true,
            "/checkout"
          );
        } else {
          this.alertasService.alertaPers("info", "Selecciona fecha", "", false, "");
        }
      } else {
        this.alertasService.alertaPers(
          "info",
          "¿Quieres registrarte?",
          "Debes registrarte para poder reservar un Espacio",
          true,
          "/login"
        );
      }
    }
  }

  /* get crea un getter: una propiedad calculada que se accede como si fuera una propiedad normal, 
  pero que en realidad ejecuta una función cada vez que se accede.
  usar get para valores derivados sin argumentos y que se acceden en plantillas, para mayor limpieza. */
  get espaciosPorSlide(): Espacio[][] {
    const slide = 4; //  cuántos espacios habrá en cada slide del carrusel

    const result: Espacio[][] = []; // Este array contendrá subarrays, cada uno con hasta 4 espacios

    for (let i = 0; i < this.espaciosCategoria.length; i += slide) {
      /* 
      divide el espaciosCategoria con slice desde i hasta i + 4

      Por ejemplo:
      si i = 0, slice(0, 4) → toma elementos 0, 1, 2, 3
      si i = 4, slice(4, 8) → toma elementos 4, 5, 6, 7
      */
      result.push(this.espaciosCategoria.slice(i, i + slide));
    }
    return result;
  }
}
