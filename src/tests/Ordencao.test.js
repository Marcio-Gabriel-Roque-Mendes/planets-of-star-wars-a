import React from 'react';
import { cleanup, render, screen, act } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import DadosMockagem from './DadosMockagem'


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
    it('Verifica se ao ser clicado o botão ASC, responde com o resultado esperado', () => {
    
        const optionsOrdenar = screen.getByTestId('column-sort');
        const botaoASC = screen.getByTestId('column-sort-input-asc');
        const botaoOrdenar = screen.getByRole('button', {name: /ordenar/i});
        
        userEvent.selectOptions(optionsOrdenar, 'population');
        userEvent.click(botaoASC);
        userEvent.click(botaoOrdenar);

        const todosPlanetas = screen.getAllByTestId('planet-name')
        expect(todosPlanetas[0]).toHaveTextContent('Hoth')
        expect(todosPlanetas[4]).toHaveTextContent('Bespin')
        expect(todosPlanetas[9]).toHaveTextContent('Coruscant')
    })

    it('Verifica se ao ser clicado o botão DESC, responde com o resultado esperado', () => {
        const optionsOrdenar = screen.getByTestId('column-sort');
        const botaoDESC = screen.getByTestId('column-sort-input-desc')
        const botaoOrdenar = screen.getByRole('button', {name: /ordenar/i});

        userEvent.selectOptions(optionsOrdenar, 'population');
        userEvent.click(botaoDESC);
        userEvent.click(botaoOrdenar);

        const todosPlanetas = screen.getAllByTestId('planet-name')
        expect(todosPlanetas[2]).toHaveTextContent('Alderaan')
        expect(todosPlanetas[6]).toHaveTextContent('Tatooine')
        expect(todosPlanetas[8]).toHaveTextContent('Dagobah')
    })
})
