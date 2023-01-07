import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextStarWars from './ContextStarWars';

const ProviderStarWars = ({ children }) => {
  const [arrayPlanetas, setArrayPlanetas] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filtros, setFiltros] = useState([]);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState();
  // const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const contextValue = { /* Objeto contextValue */
    arrayPlanetas,
    setArrayPlanetas,
    inputText,
    setInputText,
    filtros,
    setFiltros,
    order,
    setOrder,
    // filterByNumericValues,
    // setFilterByNumericValues,
  };

  const getStarWarsPlanets = () => { // SO CHAMADA A API E SALVAR NO ESTADO (COM DUAS FORMAS DE FAZER)
    fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    // fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    fetch('https://swapi.dev/api/planets/')
      .then((response) => response.json())
      .then((response) => {
        setArrayPlanetas(response.results.sort((a, b) => a.name.localeCompare(b.name)));
        setData(response.results.sort((a, b) => a.name.localeCompare(b.name)));
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
  let dados = [...data];
  const menosUm = -1;
  const ordenarASC = () => {
    if (order && order.sort === 'ASC') {
      dados.sort((a, b) => {
        if (a[order.column] === 'unknown') {
          return menosUm;
        }
        if (b[order.column] === 'unknown') {
          return true;
        }
        return Number(a[order.column]) - Number(b[order.column]);
      });
    }
  };
  const ordenarDESC = () => {
    if (order && order.sort === 'DESC') {
      dados.sort((a, b) => {
        if (a[order.column] === 'unknown') {
          return true;
        }
        if (b[order.column] === 'unknown') {
          return menosUm;
        }
        return Number(b[order.column]) - Number(a[order.column]);
      });
    }
  };
  useEffect(() => {
    // let dados = [...data]; tirado de dentro desse useEffect,
    // para poder ser usado na funcao ordenar() tambem
    filtros.forEach((filtro) => {
      if (filtro.operador === 'maior que') {
        dados = dados
          .filter((planeta) => Number(planeta[filtro
            .coluna]) > Number(filtro.valor));
      }
      if (filtro.operador === 'menor que') {
        dados = dados
          .filter((planeta) => Number(planeta[filtro
            .coluna]) < Number(filtro.valor) && filtro.valor !== 'unknown');
      }
      if (filtro.operador === 'igual a') {
        dados = dados
          .filter((planeta) => Number(planeta[filtro
            .coluna]) === Number(filtro.valor));
      }
    });
    setArrayPlanetas(dados);
    ordenarASC();
    ordenarDESC();
  }, [filtros, order]);
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
