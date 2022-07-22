import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../assets/renderWithRouter';

describe('Tabela de planetas', () => {
  // beforeEach(() => )
  it('verifica se digita no primeiro input, o valor digitado filtra os nomes e renderiza',
    async () => {
      renderWithRouter(<App />);
      const planetCoruscant = await screen.findByText(/Coruscant/i);

      const inputDigiteAqui = screen.getByTestId('name-filter');
      userEvent.type(inputDigiteAqui, 'oo');

      const planetTatooine = await screen.findByText(/Tatooine/i);
      const planetNaboo = await screen.findByText(/Naboo/i);

      expect(planetTatooine).toBeInTheDocument();
      expect(planetNaboo).toBeInTheDocument();
      expect(planetCoruscant).not.toBeInTheDocument();
    });

  const filtroColuna = 'column-filter';
  const filtroOperador = 'comparison-filter';
  const filtroValor = 'value-filter';

  it('verifica se filtra corretamente, aplicando: Periodo oribital, maior que 5000',
    async () => {
      const { debug } = renderWithRouter(<App />);
      await screen.findByTestId('option-rotation_period');
      const filtroPeriodoRotacional = await screen.findByTestId(filtroColuna);
      userEvent.type(filtroPeriodoRotacional, /rotation_period/i);

      const filtroMaiorQue = await screen.findByTestId(filtroOperador);
      userEvent.type(filtroMaiorQue, /maior que/i);

      const filtroValor5000 = await screen.findByTestId(filtroValor);
      userEvent.type(filtroValor5000, '17');

      const botaoFiltrar = await screen.findByRole('button', { name: /filtrar/i });
      userEvent.click(botaoFiltrar);

      const planetTatooine = await screen.findByRole('cell', { name: /tatooine/i });
      expect(planetTatooine).toBeInTheDocument();

      // cleanup();
      // // Filtro 2

      await screen.findByTestId('option-diameter');
      const numeroDezMil = 10000;
      const filtroDiametro = await screen.findByTestId(filtroColuna);
      userEvent.type(filtroDiametro, /diameter/i);

      const filtroMenorQue = await screen.findByTestId(filtroOperador);
      userEvent.type(filtroMenorQue, /menor que/i);

      const filtroValor10000 = await screen.findByTestId(filtroValor);
      userEvent.type(filtroValor10000, numeroDezMil);

      const filterButton = await screen.findByRole('button', { name: /filtrar/i });
      userEvent.click(filterButton);

      debug();
      const coisa = await screen.findAllByTestId();
      // const planetHoth = await screen.findByText(/hoth/i);
      // expect(planetHoth).toBeInTheDocument();

      // const planetDagobah = await screen.findByRole('cell', { name: /dagobah/i });
      // expect(planetDagobah).toBeInTheDocument();

      // const planetEndor = await screen.findByRole('cell', { name: /endor/i });
      // expect(planetEndor).toBeInTheDocument();

      // // cleanup();

      // // // Filtro 3
      // await screen.findByTestId('option-surface_water');
      // const filtroSuperficeAquatica = await screen.findByTestId(filtroColuna);
      // userEvent.type(filtroSuperficeAquatica, /surface_water/i);

      // const filtroIgualA = await screen.findByTestId(filtroOperador);
      // userEvent.type(filtroIgualA, /igual a/i);

      // const filtroValor8 = await screen.findByTestId(filtroValor);
      // userEvent.type(filtroValor8, '8');

      // const buttonFilter = await screen.findByRole('button', { name: /filtrar/i });
      // userEvent.click(buttonFilter);

      // const dagobahPlanet = await screen.findByRole('cell', { name: /dagobah/i });
      // expect(dagobahPlanet).toBeInTheDocument();

      // const endorPlanet = await screen.findByRole('cell', { name: /endor/i });
      // expect(endorPlanet).toBeInTheDocument();
    });
  // it('Teste 2', async () => {
  //     renderWithRouter(<App />)
  //      await screen.findByTestId('option-diameter');
  // const numeroDezMil = 10000;
  // const filtroDiametro = await screen.findByTestId(filtroColuna);
  // userEvent.type(filtroDiametro, /diameter/i);

  // const filtroMenorQue = await screen.findByTestId(filtroOperador);
  // userEvent.type(filtroMenorQue, /menor que/i);

  // const filtroValor10000 = await screen.findByTestId(filtroValor);
  // userEvent.type(filtroValor10000, numeroDezMil);

  // const filterButton = await screen.findByRole('button', { name: /filtrar/i });
  // userEvent.click(filterButton);

  // const planetHoth = await screen.findByText(/hoth/i);
  // expect(planetHoth).toBeInTheDocument();

  // const planetDagobah = await screen.findByRole('cell', { name: /dagobah/i });
  // expect(planetDagobah).toBeInTheDocument();

  // const planetEndor = await screen.findByRole('cell', { name: /endor/i });
  // expect(planetEndor).toBeInTheDocument();
  // })
  // it('Teste 3', async () => {
  //     renderWithRouter(<App />)
  //     const filtroSuperficeAquatica = await screen.findByTestId(filtroColuna)
  //     userEvent.type(filtroSuperficeAquatica, /surface_water/i)

  //     const filtroIgualA = await screen.findByTestId(filtroOperador)
  //     userEvent.type(filtroIgualA, /igual a/i)

  //     const filtroValor8 = await screen.findByTestId(filtroValor)
  //     userEvent.type(filtroValor8, '8')

  //     const buttonFilter = await screen.findByRole('button', {name: /filtrar/i})
  //     userEvent.click(buttonFilter)

  //     const dagobahPlanet = await screen.findByRole('cell', {name: /dagobah/i})
  //     expect(dagobahPlanet).toBeInTheDocument()

  //     const endorPlanet = await screen.findByRole('cell', {name: /endor/i})
  //     expect(endorPlanet).toBeInTheDocument()
  // })
});
