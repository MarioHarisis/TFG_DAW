import { Component } from '@angular/core';
import { Espacio } from '../../model/Espacio';
import { EspacioService } from '../../services/espacio.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  espacios : Espacio[] =[];
  existeSesion: boolean = false;
  cargando: boolean = true;

  // onBuscar
  espaciosFiltrados : Espacio [] = [];
  terminoBusqueda: string = ''; // Búsqueda por nombre o categoría
  categoriaSeleccionada: string = ''; // Filtro de categoría
  
    private _capacidadSeleccionada: number = 0;
  
    get capacidadSeleccionada(): number {
      return this._capacidadSeleccionada;
    }
    
    set capacidadSeleccionada(valor: number) {
      this._capacidadSeleccionada = valor;
    
      if (this.categoriaSeleccionada) {
        this.buscarPorCategoria(this.categoriaSeleccionada);
      } else {
        this.espaciosFiltrados = this.espacios.filter((espacio) =>
          this.filtrarPorCapacidad(espacio.capacidad)
        );
      }
    }
  
  constructor(private espacioService : EspacioService, private authService: AuthService){}

  
  ngOnInit(): void {
    this.espacios = []; // limpiar espacios

    this.espacioService.obtenerEspacios().subscribe(data => {
      this.espacios = data;
      this.espaciosFiltrados = [...data]; //copia de data a espaciosFiltrados
      this.cargando = false;
    });

    // comprobar sesion del usuario
    this.existeSesion = this.authService.estaLogeado();
  }

  // filtrar Espacios por categoría
  onBuscar(event: Event): void {
    event.preventDefault(); // Prevenir recarga
  
    const busqueda = this.terminoBusqueda.toLowerCase();
    // usar la lista de espacios para generar la nueva lista filtrada
    this.espaciosFiltrados = this.espacios.filter((espacio) => {
      // comprobar si coinciden nombre, catgeoria, capacidad
      const nombreCoincide = espacio.nombre.toLowerCase().includes(busqueda);
      const categoriaCoincide = espacio.categoria.toLowerCase().includes(busqueda);
      const capacidadCoincide = this.filtrarPorCapacidad(espacio.capacidad);

      // devolver SOLO si coincide la cantidad y el nombre o la categoría
      return capacidadCoincide && (nombreCoincide || categoriaCoincide);
    });
  }

  // buscar solo por categoría
  buscarPorCategoria(categoria: string): void {    
    this.categoriaSeleccionada = categoria; 
    // si la categoria y la capacidad coinciden, o si no se ha seleccionado capacidad
    this.espaciosFiltrados = this.espacios.filter((espacio) => 
      espacio.categoria === categoria && 
    (this.capacidadSeleccionada === 0 || this.filtrarPorCapacidad(espacio.capacidad)));
    console.log(this.espaciosFiltrados);
  }

  // filtrar por capacidad
  filtrarPorCapacidad(capacidad: number): boolean {
    switch (this.capacidadSeleccionada) {
      case 10:
        return capacidad <= 10;
      case 50:
        return capacidad > 10 && capacidad <= 50;
      case 51:
        return capacidad > 50;
      default:
        return true; // si no se selecciona ninguna, aceptar todas
    }
  }

  // resetear los filtros
  // Resetear filtros
  resetearFiltros(): void {
    this.capacidadSeleccionada = 0; // Limpiar el filtro de capacidad
    this.categoriaSeleccionada = ''; // Limpiar el filtro de categoría
    this.terminoBusqueda = ''; // Limpiar término de búsqueda
    this.espaciosFiltrados = [...this.espacios]; // Mostrar todos los espacios
  }
}