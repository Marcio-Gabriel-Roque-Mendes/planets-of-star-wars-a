import React from 'react';
import trash from '../assets/bin.png';

class TrashIcon extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ trash } alt="lixeira" className="" />
      </div>
    );
  }
}

export default TrashIcon;
