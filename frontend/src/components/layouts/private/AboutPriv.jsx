import React from 'react'
import candado from '../../../assets/images/candado.jpg'
import virus from '../../../assets/images/virus.jpg';
import Malware from '../../../assets/images/Malware.jpg'
export const AboutPriv = () => {
  return (
    /* Creacion del componente de Acerca de*/
      
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
    <div className='image-about'>
    <div className="carousel-inner">
<div className="carousel-item active" data-bs-interval="10000">
  <img src={virus} className="d-block w-100" alt="virus"/>
</div>
<div className="carousel-item" data-bs-interval="2000">
  <img src={Malware} className="d-block w-100" alt="Malware"/>
</div>
<div className="carousel-item">
  <img src={candado} className="d-block w-100" alt="candado-security"/>
</div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
<span className="carousel-control-prev-icon" aria-hidden="true"></span>
<span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
<span className="carousel-control-next-icon" aria-hidden="true"></span>
<span className="visually-hidden">Next</span>
</button>
</div>
  <h1 className='title-about'>Mision</h1>
  <p className='text-center text-one'>Buscamos establecer medidas de seguridad de forma gratuita para el usuario con el fin de utilizar nuestra herramienta de analisis de archivos para ver las vulnerabilidades de los archivos descargados asi promoviendo mas  seguridad al usuario.</p>
  <h2>Vision</h2>
  <p className='text-center mb-4 text-two'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quas suscipit rem ex deleniti praesentium quos culpa provident in, deserunt doloremque obcaecati explicabo, quis exercitationem nulla, laudantium dolor nostrum! Totam?</p>
</div>
  )
}
