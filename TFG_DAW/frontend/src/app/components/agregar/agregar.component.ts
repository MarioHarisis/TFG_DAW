import { Component, ElementRef, ViewChild } from '@angular/core';
import { EspacioService } from '../../services/espacio.service';
import { Espacio } from '../../model/Espacio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  standalone: false,
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  espacio: Espacio = new Espacio('', '', '', 0, 0, true, '', []);
  imagenFile!: File;

  enviando = false; // desactivar botón mientras se completa el envío para evitar problemas

  constructor(private espacioService: EspacioService){}

  // // comprobar y asignar el archivo imagen cuando detecta una carga
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.imagenFile = event.target.files[0];
    }
  }

  // enviar datos del formulario
  submit(): void{

    // comprobar que existe la imagen
    if (!this.imagenFile) {
      Swal.fire({
        title: "Oops...",
        text: "Debes subir una imagen",
        icon: "error"
      });

      return; // volver si no se ha cargado la imagen
    }

    this.enviando = true;
    // creación del Espacio en backend
    this.espacioService.crearEspacio(this.espacio, this.imagenFile).subscribe({
      next: (res) => {
        if (res) {
          this.enviando = false;

          Swal.fire({
            title: "Espacio creado correctamente",
            icon: "success",
            draggable: true
          });
          // limpiar formulario
          this.limpiarFormulario();
        }else {
          // si no se crea el espacio
          Swal.fire({
            title: "Oops...",
            text: "Error al crear Espacio",
            icon: "error"
          });
        }
      },
      error: (err) => {
        this.enviando = false;

        Swal.fire({
          title: "Oops...",
          text: "Error al crear Espacio",
          icon: "error"
        });
      }
    })
  }

  limpiarFormulario(): void {
    this.espacio = new Espacio('', '', '', 0, 0, true, '', []);
    this.imagenFile = undefined!;
    this.fileInput.nativeElement.value = ''; // limpiar el input de tipo file
  }
}
