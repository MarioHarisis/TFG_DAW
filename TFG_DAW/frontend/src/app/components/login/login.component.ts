import { Component } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { Usuario } from "../../model/Usuario";
import { AlertasService } from "../../services/alertas.service";

@Component({
  selector: "app-login",
  standalone: false,
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  nombre = "";
  email = "";
  password = "";
  isFlipped = false;

  constructor(
    private usuarioService: UsuarioService,
    private alertasService: AlertasService
  ) {}

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  // fomrulario login
  onLogin() {
    this.usuarioService.login(this.email, this.password).subscribe({
      next: (res: Usuario) => {
        /* 
        Guardar Usuario en sessionStorage

        Convierte el objeto res (que contiene los datos del usuario) a una cadena de texto en formato JSON.
        res viene como Objeto de tipo Usuario

        JSON.stringify(res) lo convierte en:
        '{"id":1,"nombre":"Usuario","email":"usuario@gmail.com"}'

        Esto es necesario porque sessionStorage solo puede guardar datos como strings.
        Se podría hacer tambien con un paso previo:
        
        const usuarioSesion = JSON.stringify(res);
        sessionStorage.setItem('usuario',usuarioSesion);
        */
        sessionStorage.setItem("usuario", JSON.stringify(res));
        console.log("sesion guardada");

        // mostrar alerta y redirigir a Home
        this.alertasService.alertaPers(
          "success",
          `¡Bienvenido ${res.nombre}!`,
          "",
          false,
          "/home"
        );
      },
      error: (err) => {
        this.alertasService.alertaPers(
          "error",
          "Oops...",
          "Usuario o contraseña incorrecto/s",
          false,
          ""
        );
      },
    });
  }

  // formulario registro
  registarUsuario() {
    if (
      this.nombre.trim() === "" ||
      this.email.trim() === "" ||
      this.password.trim() === ""
    ) {
      this.alertasService.alertaPers(
        "warning",
        "Formulario incompleto",
        "Debes rellenar todos los campos",
        false,
        ""
      );
      return;
    } else {
      console.log(this.nombre);
      console.log(this.email);
      console.log(this.password);

      const nuevoUsuario = new Usuario(this.nombre, this.email, this.password, "USER");
      this.usuarioService.registro(nuevoUsuario).subscribe({
        next: () => {
          this.alertasService.success("¡Registro completado!");
          this.toggleFlip();
        },
        error: () => {
          this.alertasService.error("No se pudo registarr al Usuario");
        },
      });
    }
  }
}
