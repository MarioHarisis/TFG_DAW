import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AlertasService {
  constructor(private router: Router) {}

  alertaPers(
    icon: "success" | "error" | "warning" | "info" | "question",
    title: string,
    text: string,
    cancelButton: boolean,
    redirect: string
  ): Promise<boolean> {
    // lanzar promesa devuelve booleano mediante resolve(es como el return)
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: cancelButton,
        confirmButtonText: "OK",
        confirmButtonColor: "#240046",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#e63946",
        reverseButtons: true, // Para invertir los botones
      }).then((result) => {
        if (result.isConfirmed) {
          if (redirect !== "") {
            // Acción a realizar si el usuario confirma
            this.router.navigate([redirect]);
          }
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  success(mensaje: string) {
    Swal.fire("Éxito", mensaje, "success");
  }

  error(mensaje: string) {
    Swal.fire("Error", mensaje, "error");
  }
}
