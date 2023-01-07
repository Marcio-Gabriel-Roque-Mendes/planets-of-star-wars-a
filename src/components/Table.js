/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-lines */
import React, { useContext, useState, useEffect } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import ContextStarWars from '../context/ContextStarWars';
import PlanetsImage from './Planets';
import StarWarsImage from './StarWarsImage';

function Table() {
  const options = ['population', 'orbital_period',
    'rotation_period', 'surface_water', 'diameter'];
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [valor, setValor] = useState(0);
  const [select, setSelect] = useState(options);
  const [orderCollum, setOrderCollum] = useState('population');
  const [radio, setRadio] = useState();
  const valorDoContexto = useContext(ContextStarWars);
  const { setInputText, inputText, filtros, setFiltros, setOrder,
  } = valorDoContexto;
  const handleFilter = () => {
    setFiltros((prevState) => ([...prevState, { coluna, operador, valor }]));
    const filtroDisponiveis = select.filter((opcao) => opcao !== coluna);
    setSelect(filtroDisponiveis);
    setColuna(filtroDisponiveis[0]);
    setValor(0);
  };
  const handleRemoveFilter = (colunaDeFiltro) => {
    setFiltros(filtros.filter((cadaFiltro) => cadaFiltro.coluna !== colunaDeFiltro));
    setSelect([...select, colunaDeFiltro]);
  };
  const handleRemoveAllFilters = () => {
    setSelect(options);
    setFiltros([]);
  };
  const handleClick = () => {
    setOrder({ column: orderCollum, sort: radio });
  };

  useEffect(() => {
    document.title = 'Star Wars Planets';
  }, []);

  return (

    <div>
      <div className="title">
        <article className="articleLetter">
          a
        </article>
        <div className="imageTitle">
          <StarWarsImage />
        </div>
        <div className="planetsImage">
          <PlanetsImage />
        </div>
        <article className="articleLetter">
          a
        </article>
      </div>
      <div>
        <input
          data-testid="name-filter"
          placeholder="Digite Aqui"
          value={ inputText }
          onChange={ (event) => setInputText(event.target.value) }
          className="search-input"
        />
      </div>
      <hr />
      <div className="filters-container">
        <label htmlFor="column-filter" className="column-select">
          Coluna:
          <select
            data-testid="column-filter"
            value={ coluna }
            onChange={ (event) => setColuna(event.target.value) }
            className="inputs"
          >
            {select.map((option) => (
              <option
                data-testid={ `option-${option}` }
                key={ option }
                value={ option }
                className="background-select"
              >
                {option}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison-filter" className="filter-element">
          Operador:
          <select
            data-testid="comparison-filter"
            value={ operador }
            onChange={ (event) => setOperador(event.target.value) }
            className="inputs"
          >
            <option value="maior que" className="background-select">maior que</option>
            <option value="menor que" className="background-select">menor que</option>
            <option value="igual a" className="background-select">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter" className="filter-element">
          Valor:
          <input
            type="number"
            data-testid="value-filter"
            value={ valor }
            onChange={ (event) => (setValor(event.target.value)) }
            className="number-input inputs"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => handleFilter() }
          style={ { fontWeight: 'bold' } }
          className="button-filter"
        >
          FILTRAR
        </button>
        <label htmlFor="column-sort" className="filter-element">
          Ordenar:
          <select
            data-testid="column-sort"
            value={ orderCollum }
            onChange={ (event) => setOrderCollum(event.target.value) }
            className="inputs"
          >
            <option className="background-select">population</option>
            <option className="background-select">orbital_period</option>
            <option className="background-select">rotation_period</option>
            <option className="background-select">surface_water</option>
            <option className="background-select">diameter</option>
          </select>
        </label>
        <label htmlFor="column-sort-input-asc" className="filter-element">
          Ascendente
          <input
            type="radio"
            name="ordenacao"
            data-testid="column-sort-input-asc"
            value="ASC"
            onClick={ ({ target: { value } }) => setRadio(value) }
          />
        </label>
        <label htmlFor="column-sort-input-desc" className="filter-element">
          Descendente
          <input
            type="radio"
            name="ordenacao"
            data-testid="column-sort-input-desc"
            value="DESC"
            onClick={ ({ target: { value } }) => setRadio(value) }
            className="modelo"
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleClick() }
          style={ { fontWeight: 'bold' } }
          className="button-filter"
        >
          ORDENAR
        </button>
      </div>
      <div className="buttons-filter">
        {filtros.map((filtro) => (
          <span
            key="filtro"
            data-testid="filter"
            style={ { color: 'gold', fontWeight: 'bold' } }
          >
            <div style={ { color: 'blanchedalmond', fontWeight: 'bold' } }>
              Filtros:
            </div>
            {` ${filtro.coluna} `}
            {`${filtro.operador} `}
            {`${filtro.valor}`}
            <button
              type="button"
              onClick={ () => handleRemoveFilter(filtro.coluna) }
              style={
                { marginLeft: '3px', background: 'goldenrod', borderRadius: '5px' }
              }
            >
              <IoTrashOutline />
            </button>
          </span>
        ))}
        { filtros.length >= 1 ? (
          <button
            type="button"
            onClick={ () => handleRemoveAllFilters() }
            data-testid="button-remove-filters"
            style={ { marginLeft: '80px' } }
            className="remove-button"
          >
            Remover Filtros
          </button>) : false}
      </div>

      <div>
        <table className="table-container">
          <thead className="body-table">
            <tr>
              <th>
                Name
              </th>
              <th>
                Rotation Period
              </th>
              <th>
                Orbital Period
              </th>
              <th>
                Diameter
              </th>
              <th>
                Climate
              </th>
              <th>
                Gravity
              </th>
              <th>
                Terrain
              </th>
              <th>
                Surface Water
              </th>
              <th>
                Population
              </th>
              <th>
                Created
              </th>
              <th>
                Edited
              </th>
              <th>
                URL
              </th>
            </tr>
          </thead>
          <tbody className="cabecalho-table">
            {
              valorDoContexto.arrayPlanetas
                .filter((item) => item.name.includes(valorDoContexto.inputText))
                .map((planeta) => (
                  <tr key={ planeta.name } data-testid="lines">
                    <td data-testid="planet-name">{planeta.name}</td>
                    <td>{planeta.rotation_period}</td>
                    <td>{planeta.orbital_period}</td>
                    <td>{planeta.diameter}</td>
                    <td>{planeta.climate}</td>
                    <td>{planeta.gravity}</td>
                    <td>{planeta.terrain}</td>
                    <td>{planeta.surface_water}</td>
                    <td>{planeta.population}</td>
                    <td>{planeta.created}</td>
                    <td>{planeta.edited}</td>
                    <td>{planeta.url}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Table;
