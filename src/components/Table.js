import React, { useContext, useState } from 'react';
import ContextStarWars from '../context/ContextStarWars';
// import PropTypes from 'prop-types';

function Table() {
  const options = ['population', 'orbital_period',
    'rotation_period', 'surface_water', 'diameter'];

  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [valor, setValor] = useState(0);
  const [select, setSelect] = useState(options);

  const valorDoContexto = useContext(ContextStarWars);
  const { setInputText, inputText /* filtros */, setFiltros,
  } = valorDoContexto;
  // console.log(valorDoContexto.arrayPlanetas.map((planet) => planet), 'valores');

  const handleFilter = () => {
    setFiltros((prevState) => ([...prevState, { coluna, operador, valor }]));
    setSelect(select.filter((opcao) => opcao !== coluna));
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
          // onChange={ (event) => (event.target.value === ''.trim() ? 0 : (setValor(parseFloat(event.target.value)))) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilter() }
      >
        Filtrar
      </button>

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
                <tr key={ planeta.name }>
                  <td data-testid="planeta-name">{planeta.name}</td>
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
