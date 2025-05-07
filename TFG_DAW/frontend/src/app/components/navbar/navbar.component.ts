import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor( private authService: AuthService, private router: Router, private alertaService: AlertasService){}
  
  public logeado: boolean = false;

  // comprobar sesión
  ngOnInit(): void {
    this.logeado = this.authService.estaLogeado();
    console.log("Estado de log:", this.logeado);
  }

  // cerrar sesion
  logout(): void {
    this.authService.logout();
  }

  // controlar navegacion por sesion
  navegarAgregarEspacio() {
    if (this.authService.estaLogeado()) {
      // redirigir a agregar espacios
      this.router.navigate(['/agregar']);
    }else {
      // mostrar mensaje
      this.alertaService.alertaPers('error','Ooops...', 'Debes iniciar sesión para agregar Espacios',false,'');
    }
  }

}
