import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from './alertas.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private alertasService: AlertasService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // comprobar si hay un usuario guardado en sessionStorage y devolverlo
  estaLogeado(): boolean {
    /*if (typeof window !== 'undefined') se utiliza para verificar si el objeto window
     * está disponible en el entorno de ejecución. Esto es útil en aplicaciones Angular
     * para asegurarse de que el código se está ejecutando en el navegador y no en
     * el servidor (como durante el server-side rendering o en pruebas automáticas).
     *
     * typeof window devuelve 'object' si estás en un navegador (donde window existe).
     * Si estás en un entorno donde window no existe
     * (por ejemplo, en Node.js durante la renderización en servidor), devuelve 'undefined'.
     * */
    if (typeof window !== 'undefined' && sessionStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }

  // obtener el usuario desde la sesión
  getUsuario(): any {
    if (isPlatformBrowser(this.platformId)) {
      const usuario = sessionStorage.getItem('usuario');
      return usuario ? JSON.parse(usuario) : null;
    }
    return null;
  }

  // cerrar sesión en Home
  logout(): void {
    /*if (typeof window !== 'undefined') se utiliza para verificar si el objeto window
     * está disponible en el entorno de ejecución. Esto es útil en aplicaciones Angular
     * para asegurarse de que el código se está ejecutando en el navegador y no en
     * el servidor (como durante el server-side rendering o en pruebas automáticas).
     *
     * typeof window devuelve 'object' si estás en un navegador (donde window existe).
     * Si estás en un entorno donde window no existe
     * (por ejemplo, en Node.js durante la renderización en servidor), devuelve 'undefined'.
     * */
    if (typeof window !== 'undefined') {
      // mostrar aviso de confirmación
      this.alertasService
        .alertaPers('warning', '¿Cerrar sesión?', '', true, '/home')
        .then((result) => {
          // si el usuario confirma cerrar la sesión
          if (result) {
            sessionStorage.removeItem('usuario'); // cerrar sesión
            // obtener url actual
            const urlActual = this.router.url;

            // si estamos en home, actualizar la pagina
            if (urlActual === '/home') {
              window.location.reload();
            } else {
              // si no estamos en el home, redirigir después de cerrar sesión
              this.router.navigate(['/home']);
            }
            console.log('Sesion cerrada con exito');
          } // no hacer nada si cancela
        });
    } else {
      console.log('Tipo de ventana incorrecta');
    }
  }
}
