import { Component } from '@angular/core';
import { Usuario } from '../../model/Usuario';
import { AuthService } from '../../services/auth.service';
import { AlertasService } from '../../services/alertas.service';
import { EspacioService } from '../../services/espacio.service';
import { Espacio } from '../../model/Espacio';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  // solo intenta acceder a sus propiedades si usuario ya está definido
  usuario?: Usuario;
  espacios: Espacio [] = [];

  constructor(private authService: AuthService, private alertasService: AlertasService, private espacioService: EspacioService, private usuarioService: UsuarioService){
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
        // Obtener los espacios del usuario desde el servicio        
        this.espacioService.obtenerEspaciosPorUsuario(this.usuario.id).subscribe(
        (data)=> {
          this.espacios = data ?? []; // Asignamos los datos a la variable 'espacios', convierte null/undefined en []
        },
        (error) => {
          console.log("No se pudieron obtener los espacios del usuario", error);
      });
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

  // eliminar un espacio por su ID
  eliminarEspacio(id:number): void {
    // aviso de seguridad para eliminar Espacios
    this.alertasService.alertaPers('warning', '¿Eliminar este Espacio?', 'Se eliminará este Espacio para siempre', true, '')
    .then((confirmado: boolean) => { // alertaPers devuelve un Promise<boolean>
      // si recibimos true, eliminar
      if (confirmado) {
        // eliminar Espacio
        this.espacioService.eliminarEspacio(id).subscribe(
          {
            next: () => {
              // informar de Espacio eliminado
              this.alertasService.alertaPers('success', 'Espacio eliminado correctamente', '',false, '')
              .then(()=> window.location.reload()); // recargar la página
            },
            error: ()=> {
              // si ocurre algún error durante la eliminacióm
              this.alertasService.alertaPers('error','No se pudo eliminar el Espacio', '',false,'');
            }
          }
        );
      } // no hacer nada si se cancela la eliminación del Espacio
    });
  }
}
