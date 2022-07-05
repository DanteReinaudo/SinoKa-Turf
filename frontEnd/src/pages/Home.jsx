import logo from '/logo.png';
import React from "react";
import ComprarToken from './token/ComprarToken';

const Home = () => {
  return (
    <>
      <div style={{ textAlign: 'center', }}><h1 style={{ fontSize: 40, fontWeight: 'bold' }} >Bienvenido a SINOKA!</h1></div>
      <div style={{ textAlign: 'center' }}><h2>Apuestas de caballos en criptomonedas.</h2></div>
      <img src={logo} alt="SINOKA" />
      <ComprarToken />
    </>
  )
};

export default Home;
