import { Component } from '@angular/core';
import { Usuario } from '../../model/Usuario';
import { AuthService } from '../../services/auth.service';
import { AlertasService } from '../../services/alertas.service';


@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  // solo intenta acceder a sus propiedades si usuario ya está definido
  usuario?: Usuario;

  constructor(private authService: AuthService, private alertasService: AlertasService){
  }

  ngOnInit(): void {

    // comprobar logeo
    if (this.authService.estaLogeado()) {
      // obtener usuario desde la sesion
      const usuarioSesion = sessionStorage.getItem('usuario');
      // si existe la sesion
      if (usuarioSesion) {
        /*
        El valor en sessionStorage se guarda como texto. 
        Aquí lo parseamos a un objeto JavaScript.
         En sessionStorage: '{"id":1,"nombre":"Usuario","email":"usuario@gmail.com"}'
         Con JSON.parse() se convierte en:
         { id: 1, nombre: "Mario", email: "mario@gmail.com" } as Usuario (como tipo Usuario)
          */
        this.usuario = JSON.parse(usuarioSesion) as Usuario;
      }
    }
  }

  // cerrar sesión en el perfil
  logoutPerfil():void {
    // mostrar aviso de confirmación
    this.alertasService.alertaPers('warning','¿Cerrar sesión?', '',true ,'/home');
    // cerrar sesión
    this.authService.logout();
  }
}
