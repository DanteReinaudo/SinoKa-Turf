import React from 'react';
import VerCarreras from './carreras/VerCarreras';
import logo from '/logo.png';

const Home = () => {
  return (
      <>
        <div style={{  textAlign: 'center',  }}><h1 style= {{ fontSize:40, fontWeight:'bold' }} >Bienvenido a SINOKA!</h1></div>
        <div style={{  textAlign: 'center' }}><h2>Apuestas de caballos en criptomonedas.</h2></div>
        <img src={logo} alt="SINOKA"/>
        <VerCarreras />
      </>
  )
};

export default Home;
