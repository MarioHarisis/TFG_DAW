// SPDX-License-Identifier: MIT
 
 // Define la versión de Solidity que puede compilar el contrato.
 pragma solidity >=0.8.2 <0.9.0;

 contract tfg {
    //Este contrato no tiene almacenamiento de tokens ni nada más. 
    //Es completamente simple y se enfoca solo en devolver el saldo de una cuenta en la blockchain.

    // Función pública para obtener el balance de una cuenta en Ether
    function obtenerBalance(address account) public view returns (uint256) {
        return account.balance;  // Devuelve el saldo en Ether de la dirección
    }

 }