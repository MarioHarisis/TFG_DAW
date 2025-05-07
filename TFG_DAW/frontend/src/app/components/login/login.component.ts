import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../../model/Usuario';
import { AlertasService } from '../../services/alertas.service';

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

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router, 
    private alertasService: AlertasService
  ){};
  
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
        sessionStorage.setItem('usuario', JSON.stringify(res));
        console.log('sesion guardada');
        
        // mostrar alerta y redirigir a Home
        this.alertasService.alertaPers('success',`¡Bienvenido ${res.nombre}!`, '',false,'/home');
      },
      error: (err) => {
        this.alertasService.alertaPers('error','Oops...', 'Usuario o contraseña incorrecto/s',false,'');
      }
    });
    }
}
