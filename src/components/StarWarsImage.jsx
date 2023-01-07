import React from 'react';
import Image from '../assets/starwarsimage.png';

class StarWarsImage extends React.Component {
  render() {
    return (
      <div>

        <img src={ Image } alt="StarWars" />
      </div>
    );
  }
}

export default StarWarsImage;
