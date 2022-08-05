import React, { useContext, useState } from 'react';
import ContextStarWars from '../context/ContextStarWars';

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

  return (
    <div>
      <input
        data-testid="name-filter"
        placeholder="Digite Aqui"
        value={ inputText }
        onChange={ (event) => setInputText(event.target.value) }
      />
      <hr />

      <label htmlFor="column-filter">
        Coluna:
        <select
          data-testid="column-filter"
          value={ coluna }
          onChange={ (event) => setColuna(event.target.value) }
        >
          {select.map((option) => (
            <option
              data-testid={ `option-${option}` }
              key={ option }
              value={ option }
            >
              {option}
            </option>
          ))}

        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador:
        <select
          data-testid="comparison-filter"
          value={ operador }
          onChange={ (event) => setOperador(event.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value-filter">
        Valor:
        <input
          type="number"
          data-testid="value-filter"
          value={ valor }
          onChange={ (event) => (setValor(event.target.value)) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilter() }
        style={ { fontWeight: 'bold' } }
      >
        FILTRAR
      </button>

      {filtros.map((filtro) => (
        <span
          key="filtro"
          data-testid="filter"
          style={ { marginLeft: '20px' } }
        >
          {/* population menor que 2000 */}
          {` ${filtro.coluna} `}
          {`${filtro.operador} `}
          {`${filtro.valor}`}
          <button
            type="button"
            onClick={ () => handleRemoveFilter(filtro.coluna) }
            style={ { marginLeft: '3px' } }
          >
            X
          </button>
        </span>
      ))}

      <label htmlFor="column-sort">
        Ordenar:
        <select
          data-testid="column-sort"
          value={ orderCollum }
          onChange={ (event) => setOrderCollum(event.target.value) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>rotation_period</option>
          <option>surface_water</option>
          <option>diameter</option>
        </select>
      </label>

      <label htmlFor="column-sort-input-asc">
        Ascendente
        <input
          type="radio"
          name="ordenacao"
          data-testid="column-sort-input-asc"
          value="ASC"
          onClick={ ({ target: { value } }) => setRadio(value) }
        />
      </label>

      <label htmlFor="column-sort-input-desc">
        Descendente
        <input
          type="radio"
          name="ordenacao"
          data-testid="column-sort-input-desc"
          value="DESC"
          onClick={ ({ target: { value } }) => setRadio(value) }
        />
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleClick() }
        style={ { fontWeight: 'bold' } }
      >
        ORDENAR
      </button>

      { filtros.length >= 1 ? (
        <button
          type="button"
          onClick={ () => handleRemoveAllFilters() }
          data-testid="button-remove-filters"
          style={ { marginLeft: '80px' } }
        >
          Remover Filtros
        </button>) : false}

      <table>
        <thead>
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
              Films
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

        <tbody>
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
                  <td>{planeta.films}</td>
                  <td>{planeta.created}</td>
                  <td>{planeta.edited}</td>
                  <td>{planeta.url}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
export default Table;
