import { Injectable } from '@angular/core';
import { BrowserProvider, ethers } from 'ethers';
import contractABI from "../../abi.json";
import { AlertasService } from './alertas.service';

/**
 * Los tipos del navegador que TypeScript conoce (lib.dom.d.ts),
 * no existe una propiedad ethereum en window, porque esa es una extensión
 * que agrega MetaMask o cualquier wallet Web3.
 */
declare global {
  // Agregar una propiedad a un objeto global estándar, en este caso window
  interface Window {
    ethereum?: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private provider: BrowserProvider | null = null;
  private contract!: ethers.Contract;
  private account: string | null = null;
  private signer: ethers.Signer | null = null;
  // Esta dirección solo se obtiene después de publicar en la Blockchain el smart contract
  private contractAddress = "0x614EDA7FC1955af3Cb89f38cE89627aF159B2aF8";

  constructor(private alertasService: AlertasService) { }

  async conectarWallet(): Promise<string | null> {

    if (window.ethereum) {

      try {
        // Solicita a MetaMask las cuentas disponibles del usuario y almacenamos en accounts
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});

        // Inicializar ethers con el proveedor de MetaMask y el signer
        this.provider = new BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        this.account = accounts[0];

        // Inicializar el contrato
        this.contract = new ethers.Contract(this.contractAddress, contractABI,this.signer);

        this.alertasService.alertaPers("success", "Conexión exitosa","",false,"");
        return this.account;
      } catch (error:any) {
        if (error.code === 4001) {
          console.log("Usuario rechazó la conexión");
        } else {
          this.alertasService.alertaPers("error", "Algo salió mal...","No se pudo conectar con la Wallet",false,"");
        }
        return null;
      }

    } else {
      this.alertasService.alertaPers("error", "No se detectó un proveedor Web3","MetaMask no está instalado",false,"/checkout");
      return null;
    }
  }

    // Método para obtener el saldo de un usuario a través del contrato
    async obtenerBalance(address:string): Promise<number> {
    if (!this.provider) {
      console.log("Contrato no disponible");
      return 0;
    }

    try {
      // usar metodo  obtenerBalance del Smart Contract
      const balance = await this.contract['obtenerBalance'](address);

      // recibimos el balnce en tipo string y lo parseamos a float
      const balanceEth = parseFloat(ethers.formatEther(balance));
      return Math.round(balanceEth * 10000) / 10000; // redondea a 4 decimales
    } catch (error) {
      console.log("Error al obtener balance");
      return 0;
    }
  }

  getCuenta(): string | null {
    return this.account;
  }

  getProvider(): BrowserProvider | null {
    return this.provider;
  }

  getSigner(): ethers.Signer | null {
    return this.signer;
  }
}
