import { Component } from '@angular/core';
import { EspacioService } from '../../services/espacio.service';
import { ActivatedRoute } from '@angular/router';
import { Espacio } from '../../model/Espacio';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  espacio: Espacio = new Espacio('', '', '', 0, 0, true, '',0 , []);

  // ActivatedRoute nos da acceso a la información de la ruta activa
  constructor(private espacioService : EspacioService, private router: ActivatedRoute){
    this.router.params.subscribe((params) => {
    /* de la ruta activa obtenemos el numero ID depués lo usamos como parametro en obtenerEspacioId 
    tambien podríamos crear una variable intermedia como:
    const urlId = params['id'] ydespués pasarlo al método */
    // console.log(params);
      espacioService.obtenerEspacioId(params['id']).subscribe((data) => {
        // usamos el id para buscar el Espacio consultando al back
        this.espacio = data; // asignar el Espacio si es encontrado
      });
    });
  }
}
