/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextStarWars from './ContextStarWars';

const ProviderStarWars = ({ children }) => {
  const [arrayPlanetas, setArrayPlanetas] = useState([]);

  const contextValue = { /* Objeto contextValue */
    arrayPlanetas,
    setArrayPlanetas,
  };

  const getStarWarsPlanets = () => { // SO CHAMADA A API E SALVAR NO ESTADO (COM DUAS FORMAS DE FAZER)
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setArrayPlanetas(response.results);

        // response.results.map((planet) => setArrayPlanetas((prevState) => [...prevState, planet.name])); //FORMA 1

        // response.results
        //   .map((planet) => setArrayPlanetas([...arrayPlanetas, planet])); // FORMA 2
      });
  };

  useEffect(() => {
    getStarWarsPlanets();
  }, []);

  return (
    <ContextStarWars.Provider value={ contextValue }>
      {children}
    </ContextStarWars.Provider>
  );
};

ProviderStarWars.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderStarWars;
