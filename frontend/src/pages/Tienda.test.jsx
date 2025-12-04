// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/matchers';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect as vitestExpect } from 'vitest';

vitestExpect.extend(matchers);

import Tienda from './Tienda';

// Datos de prueba (Mocks)
const productosMock = [
    { id: "1", nombre: "Ramo de Rosas", precio: 40000, imagen: "img1.jpg" },
    { id: "2", nombre: "Girasoles", precio: 20000, imagen: "img2.jpg" },
    { id: "3", nombre: "Tulipanes", precio: 30000, imagen: "img3.jpg" }
];

describe('Página Tienda (Lógica de Filtrado)', () => {
    
    afterEach(cleanup);
    const agregarMock = vi.fn();

    it('Debe renderizar la lista completa de productos al inicio', () => {
        render(<Tienda productos={productosMock} agregarAlCarrito={agregarMock} />);
        // Deben aparecer los 3 nombres
        expect(screen.getByText('Ramo de Rosas')).toBeInTheDocument();
        expect(screen.getByText('Girasoles')).toBeInTheDocument();
        expect(screen.getByText('Tulipanes')).toBeInTheDocument();
    });

    it('Debe filtrar los productos cuando se escribe en el buscador', () => {
        render(<Tienda productos={productosMock} agregarAlCarrito={agregarMock} />);
        
        // 1. Buscamos el input
        const inputBusqueda = screen.getByPlaceholderText(/Buscar flor por nombre/i);
        
        // 2. Escribimos "Girasoles"
        fireEvent.change(inputBusqueda, { target: { value: 'Girasoles' } });

        // 3. Verificamos que "Girasoles" esté, pero "Rosas" NO esté
        expect(screen.getByText('Girasoles')).toBeInTheDocument();
        expect(screen.queryByText('Ramo de Rosas')).not.toBeInTheDocument();
    });

    it('Debe filtrar por precio (Menos de 35k)', () => {
        render(<Tienda productos={productosMock} agregarAlCarrito={agregarMock} />);
        
        // 1. Clic en botón "Menos de $35k"
        const botonFiltro = screen.getByText('Menos de $35k');
        fireEvent.click(botonFiltro);

        // 2. Girasoles (20k) y Tulipanes (30k) deberían estar. Rosas (40k) NO.
        expect(screen.getByText('Girasoles')).toBeInTheDocument();
        expect(screen.queryByText('Ramo de Rosas')).not.toBeInTheDocument();
    });
});