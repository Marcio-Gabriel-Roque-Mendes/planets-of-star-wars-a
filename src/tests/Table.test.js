import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouter from '../assets/renderWithRouter'

describe('Tabela de planetas', () => {
    it('verifica se digitar no primeiro input, o valor digitado filtar os nomes e renderiza', async () => {
        renderWithRouter(<App />)
        const planetCoruscant = await screen.findByText(/Coruscant/i)
        
        const inputDigiteAqui = screen.getByTestId('name-filter')
        userEvent.type(inputDigiteAqui , 'oo')

        const planetTatooine = await screen.findByText(/Tatooine/i)
        const planetNaboo = await screen.findByText(/Naboo/i)

        expect(planetTatooine).toBeInTheDocument()
        expect(planetNaboo).toBeInTheDocument()
        expect(planetCoruscant).not.toBeInTheDocument()
    })

    it('verifica se filtra corretamente, aplicando os 3 tipos de fitros: Periodo oribital, maior que 5000', async () => {
        renderWithRouter(<App />)
        const filtroPeriodoRotacional = await screen.findByTestId('column-filter')
        userEvent.type(filtroPeriodoRotacional, /rotation_period/i)

        const filtroMaiorQue = await screen.findByTestId('comparison-filter')
        userEvent.type(filtroMaiorQue, /maior que/i)

        const filtroValor5000 = await screen.findByTestId('value-filter')
        userEvent.type(filtroValor5000, '17')

        const botaoFiltrar = await screen.findByRole('button', {name: /filtrar/i})
        userEvent.click(botaoFiltrar)

        const planetBespin = await screen.findByRole('cell', {name: /bespin/i})
        expect(planetBespin).toBeInTheDocument()

        // // Filtro 2

        const filtroDiametro = await screen.findByTestId('column-filter')
        userEvent.type(filtroDiametro, /diameter/i)

        const filtroMenorQue = await screen.findByTestId('comparison-filter')
        userEvent.type(filtroMenorQue, /menor que/i)

        const filtroValor10000 = await screen.findByTestId('value-filter')
        userEvent.type(filtroValor10000, 10000)

        const filterButton = await screen.findByRole('button', {name: /filtrar/i})
        userEvent.click(filterButton) 

        const planetHoth = await screen.findByText(/hoth/i)
        expect(planetHoth).toBeInTheDocument()

        const planetDagobah = await screen.findByRole('cell', {name: /dagobah/i})
        expect(planetDagobah).toBeInTheDocument()

        const planetEndor = await screen.findByRole('cell', {name: /endor/i})
        expect(planetEndor).toBeInTheDocument()

        // // Filtro 3
        const filtroSuperficeAquatica = await screen.findByTestId('column-filter')
        userEvent.type(filtroSuperficeAquatica, /surface_water/i)

        const filtroIgualA = await screen.findByTestId('comparison-filter')
        userEvent.type(filtroIgualA, /igual a/i)

        const filtroValor8 = await screen.findByTestId('value-filter')
        userEvent.type(filtroValor8, '8')

        const buttonFilter = await screen.findByRole('button', {name: /filtrar/i})
        userEvent.click(buttonFilter) 

        const dagobahPlanet = await screen.findByRole('cell', {name: /dagobah/i})
        expect(dagobahPlanet).toBeInTheDocument()

        const endorPlanet = await screen.findByRole('cell', {name: /endor/i})
        expect(endorPlanet).toBeInTheDocument()
    })
    // it('Teste 2', async () => {
    //     renderWithRouter(<App />)
    //     const filtroDiametro = await screen.findByTestId('column-filter')
    //     userEvent.type(filtroDiametro, /diameter/i)

    //     const filtroMenorQue = await screen.findByTestId('comparison-filter')
    //     userEvent.type(filtroMenorQue, /menor que/i)

    //     const filtroValor10000 = await screen.findByTestId('value-filter')
    //     userEvent.type(filtroValor10000, 10000)

    //     const filterButton = await screen.findByRole('button', {name: /filtrar/i})
    //     userEvent.click(filterButton) 

    //     const planetHoth = await screen.findByText(/hoth/i)
    //     expect(planetHoth).toBeInTheDocument()

    //     const planetDagobah = await screen.findByRole('cell', {name: /dagobah/i})
    //     expect(planetDagobah).toBeInTheDocument()

    //     const planetEndor = await screen.findByRole('cell', {name: /endor/i})
    //     expect(planetEndor).toBeInTheDocument()
    // })
    // it('Teste 3', async () => {
    //     renderWithRouter(<App />)
    //     const filtroSuperficeAquatica = await screen.findByTestId('column-filter')
    //     userEvent.type(filtroSuperficeAquatica, /surface_water/i)

    //     const filtroIgualA = await screen.findByTestId('comparison-filter')
    //     userEvent.type(filtroIgualA, /igual a/i)

    //     const filtroValor8 = await screen.findByTestId('value-filter')
    //     userEvent.type(filtroValor8, '8')

    //     const buttonFilter = await screen.findByRole('button', {name: /filtrar/i})
    //     userEvent.click(buttonFilter) 

    //     const dagobahPlanet = await screen.findByRole('cell', {name: /dagobah/i})
    //     expect(dagobahPlanet).toBeInTheDocument()

    //     const endorPlanet = await screen.findByRole('cell', {name: /endor/i})
    //     expect(endorPlanet).toBeInTheDocument()
    // })
})