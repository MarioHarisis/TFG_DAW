import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  isFlipped = false;

  constructor(private usuarioService: UsuarioService){};
  
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  // fomrulario login
  onLogin() {
    this.usuarioService.login(this.email, this.password).subscribe({
      next: (res) => {
                  Swal.fire({
                    title: "Usuario logeado correctamente",
                    icon: "success",
                  });
      },
      error: (err) => {
              Swal.fire({
                title: "Oops...",
                text: "Usuario o contraseña incorrecto/s",
                icon: "error"
              });
      }
    });
    }


}
