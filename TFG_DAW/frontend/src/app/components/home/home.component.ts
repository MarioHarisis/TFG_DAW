import { Component } from '@angular/core';
import { Espacio } from '../../model/Espacio';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  listaEspacios: Espacio[] = [
    new Espacio("Meeting room", "Best meeting room", 7, "https://plus.unsplash.com/premium_photo-1661757413819-2ca3fb499c0d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    new Espacio("Bowling", "Best bowlin in town", 10, "https://images.unsplash.com/photo-1650313525165-40c8132c0ae0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    new Espacio("Private Studio", "Music Studio Chill", 10, "https://wallpapercave.com/wp/wp10286061.jpg"),
    new Espacio("Billars & Co", "Have the best time in here", 10, "https://images.unsplash.com/photo-1585703900437-c2d7b85dff59?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ),
    new Espacio("Football pitch", "A fantastic natural football pitch", 22, "https://images.unsplash.com/photo-1521534309669-61575d0047fb?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    new Espacio("Pool Party", "Enjoy life! And... sun", 22, "https://images.unsplash.com/photo-1587870306141-4f19861e6c73?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    new Espacio("Sauna-Spa", "Relax time", 22, "https://images.unsplash.com/photo-1701875282743-6c42c0378bae?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
/*     new Espacio("Golf Club", "Golf Club for the highest standars", 22, "https://images.unsplash.com/photo-1505413461823-c5628c330608?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), */

new Espacio("Meeting room", "Best meeting room", 7, "https://plus.unsplash.com/premium_photo-1661757413819-2ca3fb499c0d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
new Espacio("Bowling", "Best bowlin in town", 10, "https://images.unsplash.com/photo-1650313525165-40c8132c0ae0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
new Espacio("Private Studio", "Music Studio Chill", 10, "https://wallpapercave.com/wp/wp10286061.jpg"),
new Espacio("Billars & Co", "Have the best time in here", 10, "https://images.unsplash.com/photo-1585703900437-c2d7b85dff59?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ),
new Espacio("Football pitch", "A fantastic natural football pitch", 22, "https://images.unsplash.com/photo-1521534309669-61575d0047fb?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
new Espacio("Pool Party", "Enjoy life! And... sun", 22, "https://images.unsplash.com/photo-1587870306141-4f19861e6c73?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
new Espacio("Sauna-Spa", "Relax time", 22, "https://images.unsplash.com/photo-1701875282743-6c42c0378bae?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
  ];
}