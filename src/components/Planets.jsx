import React from 'react';
import planetsImage from '../assets/planets.png';

class PlanetsImage extends React.Component {
  render() {
    return (
      <div>
        <img src={ planetsImage } alt="imagem de titulo planetas " />
      </div>
    );
  }
}

export default PlanetsImage;
