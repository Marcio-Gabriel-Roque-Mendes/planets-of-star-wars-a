/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextStarWars from './ContextStarWars';

const ProviderStarWars = ({ children }) => {
  const [arrayPlanetas, setArrayPlanetas] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filtros, setFiltros] = useState([]);
  const [data, setData] = useState([]);

  const contextValue = { /* Objeto contextValue */
    arrayPlanetas,
    setArrayPlanetas,
    inputText,
    setInputText,
    filtros,
    setFiltros,
  };

  const getStarWarsPlanets = () => { // SO CHAMADA A API E SALVAR NO ESTADO (COM DUAS FORMAS DE FAZER)
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setArrayPlanetas(response.results);

        setData(response.results);

        // response.results.map((planet) => setArrayPlanetas((prevState) => [...prevState, planet.name])); //FORMA 1

        // response.results
        //   .map((planet) => setArrayPlanetas([...arrayPlanetas, planet])); // FORMA 2
      });
  };

  useEffect(() => {
    getStarWarsPlanets();
  }, []);

  // const numero = 3000;

  // useEffect(() => {
  //   setArrayPlanetas(data);
  //   const comparacao = arrayPlanetas.filter((planeta) => Number(planeta
  //     .population) > numero);
  //   setArrayPlanetas(comparacao);
  // }, [filtros]);

  // useEffect(() => {
  //   setArrayPlanetas(data);

  //   if (filtros[0]?.operador === 'maior que') {
  //     const comparacao = arrayPlanetas
  //       .filter((planeta) => Number(planeta[filtros[0]
  //         .coluna]) > Number(filtros[0].valor));
  //     return setArrayPlanetas(comparacao);
  //   }
  //   if (filtros[0]?.operador === 'menor que') {
  //     const comparacao = arrayPlanetas
  //       .filter((planeta) => Number(planeta[filtros[0]
  //         .coluna]) < Number(filtros[0].valor));
  //     return setArrayPlanetas(comparacao);
  //   }
  //   if (filtros[0]?.operador === 'igual a') {
  //     const comparacao = arrayPlanetas
  //       .filter((planeta) => Number(planeta[filtros[0]
  //         .coluna]) === Number(filtros[0].valor));
  //     return setArrayPlanetas(comparacao);
  //   }
  // }, [filtros]);

  useEffect(() => {
    setArrayPlanetas(data);

    filtros.forEach((filtro) => {
      if (filtro.operador === 'maior que') {
        const comparacao = arrayPlanetas
          .filter((planeta) => Number(planeta[filtro
            .coluna]) > Number(filtro.valor));
        return setArrayPlanetas(comparacao);
      }
      if (filtro.operador === 'menor que') {
        const comparacao = arrayPlanetas
          .filter((planeta) => Number(planeta[filtro
            .coluna]) < Number(filtro.valor));
        return setArrayPlanetas(comparacao);
      }
      if (filtro.operador === 'igual a') {
        const comparacao = arrayPlanetas
          .filter((planeta) => Number(planeta[filtro
            .coluna]) === Number(filtro.valor));
        return setArrayPlanetas(comparacao);
      }
    });
  }, [filtros]);

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
