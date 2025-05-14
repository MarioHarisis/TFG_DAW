import { Component } from '@angular/core';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-ethereum',
  standalone: false,
  templateUrl: './ethereum.component.html',
  styleUrl: './ethereum.component.css'
})
export class EthereumComponent {
  
  cuenta!: any;
  balance!: any;
  constructor(private web3Service: Web3Service){}
  
  // Conexion con la Wallet 
  async conectarWallet() {
    this.cuenta = await this.web3Service.conectarWallet();
    if (this.cuenta) {
      console.log("Cuenta:" , this.cuenta);
      this.balance = await this.web3Service.obtenerBalance(this.cuenta);
      
      
    }else {
      console.log("No se pudo encontrar la wallet");
      
    }
  }

  desconectarWallet(): void {
    this.cuenta = null;
    this.balance = null;
  }

  pagar() {
  console.log("Pago realizado");
  
  }

}
