import { Component } from '@angular/core';
import { EspacioService } from './services/espacio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(private espacioService : EspacioService){}

  ngOnInit(): void {
    // Cargar todos los Espacios cuando se inicie la app
    this.espacioService.obtenerEspacios().subscribe((data) => this.espacioService.espacios = data);
  }
}
