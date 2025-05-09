import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DetailComponent } from './components/detail/detail.component';
import { AgregarComponent } from './components/agregar/agregar.component';

const routes: Routes = [
{
  path:'',
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path:'home',
  component:HomeComponent
},
{
  path: 'detail/:id',
  component:DetailComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'perfil',
  component:PerfilComponent
},
{
  path:'agregar',
  component: AgregarComponent
}, // para creacion
{
  path: 'agregar/:id',
  component: AgregarComponent
},// para edicion
{
  path:'error',
  component:ErrorComponent
},
{
  path: '**',
  redirectTo:'error'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
