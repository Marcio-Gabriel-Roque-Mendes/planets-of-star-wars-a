import React from 'react';
import { cleanup, render, screen, act } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import DadosMockagem from './DadosMockagem'

//Teste com menor que, maior que e igual á no mesmo (it)

describe('testa o componente Filters', () => {
    beforeEach(async () => {
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(DadosMockagem)
        })
        await act(async () => {
            render(<App />)
        })
    });

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    it('verifica se ao digitar no primeiro filtro, o valor digitado filtra os nomes e renderiza',
    async () => {
      const planetCoruscant = screen.getByText(/Coruscant/i);

      const inputDigiteAqui = screen.getByTestId('name-filter');
      userEvent.type(inputDigiteAqui, 'oo');

      const planetTatooine = screen.getByText(/Tatooine/i);
      const planetNaboo = screen.getByText(/Naboo/i);

      expect(planetTatooine).toBeInTheDocument();
      expect(planetNaboo).toBeInTheDocument();
      expect(planetCoruscant).not.toBeInTheDocument();
    });
    
    const filtroColuna = 'column-filter';
    const filtroOperador = 'comparison-filter';
    const filtroValor = 'value-filter';

    it('verifica se o filtro maior que tem o retorno esperado',
    async () => {
      // MAIORQUE
      const filtroPeriodoOrbital = screen.getByTestId(filtroColuna)
      userEvent.selectOptions(filtroPeriodoOrbital, 'orbital_period');

      const filtroMaiorQue = screen.getByTestId(filtroOperador);
      userEvent.selectOptions(filtroMaiorQue, 'maior que');

      const filtroPeloValor400 = screen.getByTestId(filtroValor);
      userEvent.type(filtroPeloValor400, '400');

      const botaoFiltrar = screen.getByRole('button', { name: /filtrar/i });
      userEvent.click(botaoFiltrar);

      const planetBespin = screen.getByText(/Bespin/i);
      const planetEndor = screen.getByText(/Endor/i);
      const planetHoth = screen.getByText(/Hoth/i);
      const planetKamino = screen.getByText(/Kamino/i);
      const planetYavin = screen.getByText(/Yavin/i);

      expect(planetBespin).toBeInTheDocument();
      expect(planetEndor).toBeInTheDocument();
      expect(planetHoth).toBeInTheDocument();
      expect(planetKamino).toBeInTheDocument();
      expect(planetYavin).toBeInTheDocument();

    // MENOR QUE
      const numeroVinteMil = '20000';
      const filtroDiametro = screen.getByTestId(filtroColuna);
      userEvent.selectOptions(filtroDiametro, 'diameter');
    
      const filtroMenorQue = screen.getByTestId(filtroOperador);
      userEvent.selectOptions(filtroMenorQue, 'menor que');
    
      const filtroPeloValor = screen.getByTestId(filtroValor);
      userEvent.type(filtroPeloValor, numeroVinteMil);
      const filtroPeloValor2 = screen.getByTestId(filtroValor);
      console.log(filtroPeloValor2.value);
    
      const filterButton = screen.getByRole('button', { name: /filtrar/i });
      userEvent.click(filterButton);
    
      expect(planetEndor).toBeInTheDocument();
      expect(planetHoth).toBeInTheDocument();
      expect(planetKamino).toBeInTheDocument();
      expect(planetYavin).toBeInTheDocument();

      // IGUAL A
      const filtroSuperficeAquatica = screen.getByTestId(filtroColuna)
      userEvent.selectOptions(filtroSuperficeAquatica, 'surface_water')
  
      const filtroIgualA = screen.getByTestId(filtroOperador)
      userEvent.selectOptions(filtroIgualA, 'igual a')
  
      const filtroPeloValor8 = screen.getByTestId(filtroValor)
      userEvent.type(filtroPeloValor8, '8')
  
      const buttonFilter = screen.getByRole('button', {name: /filtrar/i})
      userEvent.click(buttonFilter)
  
      const endorPlanet = screen.getByText(/Endor/i);
      const yavinPlanet = screen.getByText(/Yavin/i);

      expect(endorPlanet).toBeInTheDocument();
      expect(yavinPlanet).toBeInTheDocument();
      
      expect(screen.getByText(/orbital_period maior que 0400/i)).toBeInTheDocument();
      expect(screen.getByText(/diameter menor que 020000/i)).toBeInTheDocument();
      expect(screen.getByText(/surface_water igual a 08/i)).toBeInTheDocument();
      
    }
  );

  it('verifica se o botao de remove um filtro funciona conforme o esperado', 
  () => {
    const linhas = screen.getAllByTestId("lines")
    expect(linhas).toHaveLength(10)

    const filtroPeriodoDeRotacao = screen.getByTestId(filtroColuna);
    userEvent.selectOptions(filtroPeriodoDeRotacao, 'rotation_period');
    
    const filtroMenorQue = screen.getByTestId(filtroOperador);
    userEvent.selectOptions(filtroMenorQue, 'menor que');
    
    const filtroPeloValor = screen.getByTestId(filtroValor);
    userEvent.type(filtroPeloValor, '20');
    
    const filterButton = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(filterButton);

    const lines = screen.getAllByTestId("lines")
    expect(lines).toHaveLength(2)

    const removeOneFilterButton = screen.getByRole('button', {name: /x/i});
    userEvent.click(removeOneFilterButton);

    const QuntLinhas = screen.getAllByTestId("lines")
    expect(QuntLinhas).toHaveLength(10)
  })

it('verifica se o botao de remove todos os filtros funciona conforme o esperado', 
() => {
    const numeroDezMil = '10000';
    const filtroDiametro = screen.getByTestId(filtroColuna);
    userEvent.selectOptions(filtroDiametro, 'diameter');

    const filtroMenorQue = screen.getByTestId(filtroOperador);
    userEvent.selectOptions(filtroMenorQue, 'menor que');

    const filtroValor10000 = screen.getByTestId(filtroValor);
    userEvent.type(filtroValor10000, numeroDezMil);

    const filterButton = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(filterButton);
    
    const planetDagobah = screen.getByText(/dagobah/i);
    const planetHoth = screen.getByText(/hoth/i);
    const planetEndor = screen.getByText(/endor/i);

    expect(planetHoth).toBeInTheDocument();
    expect(planetDagobah).toBeInTheDocument();
    expect(planetEndor).toBeInTheDocument();

    const linhas = screen.getAllByTestId("lines")
    expect(linhas).toHaveLength(3)

    const filtroSuperficeAquatica = screen.getByTestId(filtroColuna)
    userEvent.selectOptions(filtroSuperficeAquatica, 'surface_water')

    const filtroIgualA = screen.getByTestId(filtroOperador)
    userEvent.selectOptions(filtroIgualA, 'igual a')

    const filtroValor8 = screen.getByTestId(filtroValor)
    userEvent.type(filtroValor8, '8')

    const buttonFilter = screen.getByRole('button', {name: /filtrar/i})
    userEvent.click(buttonFilter)

    const dagobahPlanet = screen.getByText(/dagobah/i);
    expect(dagobahPlanet).toBeInTheDocument()

    const endorPlanet = screen.getByText(/endor/i)
    expect(endorPlanet).toBeInTheDocument()

    const lines = screen.getAllByTestId("lines")
    expect(lines).toHaveLength(2)

    const botaoRemoveTodosFiltros = screen.getByRole('button', {name: /remover filtros/i})
    userEvent.click(botaoRemoveTodosFiltros)

    const QuntLinhas = screen.getAllByTestId("lines")
    expect(QuntLinhas).toHaveLength(10)
  })

}
)
