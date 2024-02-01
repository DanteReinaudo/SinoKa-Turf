# SinoKa Turf

### Integrantes 
Nombre |   Email
------ |  -------------
[VALMAGGIA, Matias](https://github.com/mvalmaggia) | mvalmaggia@fi.uba.ar
[ARRACHEA, Tomas](https://github.com/TomasArrachea) | tarrachea@fi.uba.ar
[REINAUDO, Dante](https://github.com/DanteReinaudo) | dreinaudo@fi.uba.ar

### Descripción
Este proyecto fue desarrollado en Solidity utilizando smart contracts, permite realizar apuestas den carreras de caballos utilizando tokens personalizados. Cada caballo en la carrera es representado como un NFT.

### Características Principales
- Creación de un token personalizado (HORSE Token) para realizar apuestas.
- Utilización de contratos en Solidity para gestionar las carreras de caballos y las apuestas.
- Cada caballo en la carrera es un NFT con propiedades únicas.

### Requisitos Previos
- Node.js y npm instalados.
- Truffle instalado globalmente (npm install -g truffle).
- Conexión a una red Ethereum (puede ser local o Testnet/Ropsten).

### Instalación
- Clona el repositorio
- Instala las dependencias: npm install
- Para deployar los contratos en la red de prueba ropsten:
    ```export NODE_OPTIONS=--openssl-legacy-provider```
    ```truffle deploy --network ropsten```
