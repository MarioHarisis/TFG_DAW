import { Component, ElementRef, ViewChild } from '@angular/core';
import { EspacioService } from '../../services/espacio.service';
import { Espacio } from '../../model/Espacio';
import Swal from 'sweetalert2';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-agregar',
  standalone: false,
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  espacio: Espacio = new Espacio('', '', '', 0, 0, true, '', 0
    ,[]);
  imagenFile!: File;

  enviando = false; // desactivar botón mientras se completa el envío para evitar problemas

  constructor(private espacioService: EspacioService, private alertasService: AlertasService){}

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

    // verificar usuario en sesion
    const usuarioSession = sessionStorage.getItem('usuario');
    if (!usuarioSession) {
      this.alertasService.alertaPers('error','Sesión expìrada','Debes iniciar sesión para publicar un espacio',false,'');
      return;
    }

    // Pasar usuario y asignar el ID al Espacio
    const usuario = JSON.parse(usuarioSession);
    this.espacio.usuarioId = usuario.id;


    this.enviando = true;
    // creación del Espacio en backend
    this.espacioService.crearEspacio(this.espacio, this.imagenFile).subscribe({
      next: (res) => {
        if (res) {
          this.enviando = false;
          this.alertasService.alertaPers('success','Espacio creado correctamente','',false,'/perfil');
          // limpiar formulario
          this.limpiarFormulario();
        }else {
          // si no se crea el espacio
          this.alertasService.alertaPers('error','Oops..','Error al crear Espacio',false,'');
        }
      },
      error: (err) => {
        this.enviando = false;
        this.alertasService.alertaPers('error','Oops..','Error al crear Espacio 2',false,'');
      }
    })
  }


  limpiarFormulario(): void {
    this.espacio = new Espacio('', '', '', 0, 0, true, '',0 , []);
    this.imagenFile = undefined!;
    this.fileInput.nativeElement.value = ''; // limpiar el input de tipo file
  }
}
