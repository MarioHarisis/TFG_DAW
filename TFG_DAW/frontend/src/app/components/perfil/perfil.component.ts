import { Component } from '@angular/core';
import { Usuario } from '../../model/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuarios: Usuario[] = []; // Array para almacenar los usuarios
  usuario!: Usuario;

  constructor(private usuarioService: UsuarioService){
  }

  ngOnInit(): void {
    // llamar al servicio y obtener usuarios
    this.usuarioService.getUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
        this.usuario = this.usuarios[0];
        console.log(this.usuarios);
        
      },
      (error) => {
        console.error('Hubo un problema al obtener usuarios:', error);
        
      }
    )
  }
}
