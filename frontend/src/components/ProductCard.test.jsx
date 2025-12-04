// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ProductCard from './ProductCard';

// --- CAMBIO CLAVE AQUÍ ---
// 1. Importamos los "matchers" (comparadores) específicamente
import * as matchers from '@testing-library/jest-dom/matchers';

// 2. Conectamos manualmente esos matchers a Vitest
expect.extend(matchers);
// -------------------------

describe('Componente ProductCard', () => {
    
    // Limpiamos la pantalla después de cada prueba
    afterEach(() => {
        cleanup();
    });

    const productoMock = {
        id: "1",
        nombre: "Flor de Prueba",
        precio: 10000,
        descripcion: "Descripción de prueba",
        imagen: "https://via.placeholder.com/150"
    };

    const agregarMock = vi.fn();

    it('Debe mostrar el nombre del producto correctamente', () => {
        render(<ProductCard producto={productoMock} agregarAlCarrito={agregarMock} />);
        expect(screen.getByText(/Flor de Prueba/i)).toBeInTheDocument();
    });

    it('Debe mostrar el precio formateado', () => {
        render(<ProductCard producto={productoMock} agregarAlCarrito={agregarMock} />);
        // Buscamos el precio ignorando si usa punto o coma
        expect(screen.getByText(/\$10[.,]000/)).toBeInTheDocument();
    });

    it('Debe llamar a la función agregarAlCarrito cuando se hace click', () => {
        render(<ProductCard producto={productoMock} agregarAlCarrito={agregarMock} />);
        const boton = screen.getByRole('button', { name: /Agregar al Carrito/i });
        fireEvent.click(boton);
        expect(agregarMock).toHaveBeenCalledTimes(1);
    });
});