import { Component, ElementRef, ViewChild } from '@angular/core';
import { EspacioService } from '../../services/espacio.service';
import { Espacio } from '../../model/Espacio';
import { AlertasService } from '../../services/alertas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  standalone: false,
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  espacio: Espacio = new Espacio('', '', '', '',0, null, true, '', 0,[]);
  imagenFile!: File;

  enviando = false; // desactivar botón mientras se completa el envío para evitar problemas
  modoEdicion = false;

  constructor(private espacioService: EspacioService, private alertasService: AlertasService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe( params => {
       const id = Number(params['id']);

       if (id) {
         this.modoEdicion = true;
         this.cargarEspacio(Number(id));
       }

    });
    
  }

  // para poder ver el espacio a Editar
  cargarEspacio(id: number): void {
    this.espacioService.obtenerEspacioId(id).subscribe({
      next: (espacio) => {
        this.espacio = espacio;
      },
      error: () => {
        this.alertasService.alertaPers('error','Error','No se pudo cargar el Espacio.',false,'');
      }
    });
  }

  

  // // comprobar y asignar el archivo imagen cuando detecta una carga
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.imagenFile = event.target.files[0];
    }
  }

  // enviar datos del formulario
  submit(): void{

    // avisar si falta algún campo por seleccionar
    if (this.comprobarFormulario()) {
      this.alertasService.alertaPers('info','Falta algún campo por rellenar', 'Revisa los campos del formulario.', false,'');
      return;
    }

    // comprobar que existe la imagen
    if (!this.imagenFile && !this.modoEdicion) {
      this.alertasService.alertaPers('info', 'Debes subir una imagen', 'Sube una imagen de tu Espacio', false,'');
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

    // boton deshabilidato para evitar peticiones excesivas
    this.enviando = true;


    // si se quisiese editar un espacio
    if (this.modoEdicion) {
      this.espacioService.editarEspacio(this.espacio, this.imagenFile).subscribe({
        next: () => {
          this.enviando = false;
          this.alertasService.alertaPers('success', 'Espacio actualizado', '', false, '/home');
        },
        error: () => {
          this.enviando = false;
          this.alertasService.alertaPers('error', 'Error', 'No se pudo editar el espacio.', false, '');
        }
      });
    }else {
      // creación del Espacio en backend
      this.espacioService.crearEspacio(this.espacio, this.imagenFile).subscribe({
        next: (res) => {
          if (res) {
            this.enviando = false; // boton reactivado despues de realizar el envío
            this.espacioService.espacios.push(this.espacio); // agregar también a lista del service
            this.alertasService.alertaPers('success','Espacio creado correctamente','',false,'/home');
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
      });
    }
  }


  // comprobar si hay campos vacíos en el formulario
  comprobarFormulario(): boolean {
    return !this.espacio.nombre.trim() ||
           !this.espacio.descripcion.trim() ||
           !this.espacio.categoria.trim() ||
           !this.espacio.ubicacion.trim() ||
           !this.espacio.precio ||
           !this.espacio.capacidad;
  }
  

  limpiarFormulario(): void {
    this.espacio = new Espacio('', '','', '', 0, 0, true, '',0 , []);
    this.imagenFile = undefined!;
    this.fileInput.nativeElement.value = ''; // limpiar el input de tipo file
  }
}
