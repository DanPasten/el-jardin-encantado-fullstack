// @vitest-environment jsdom
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom'; 
import '@testing-library/jest-dom/matchers';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect as vitestExpect } from 'vitest';

vitestExpect.extend(matchers);

import Navigation from './Navigation';

describe('Componente Navigation', () => {
    
    afterEach(cleanup);

    it('Debe mostrar el nombre de la tienda (Logo)', () => {
       
        render(
            <BrowserRouter>
                <Navigation cantidadCarrito={0} />
            </BrowserRouter>
        );
        expect(screen.getByText(/El Jardín Encantado/i)).toBeInTheDocument();
    });

    it('Debe mostrar el contador del carrito en 0 cuando está vacío', () => {
        render(
            <BrowserRouter>
                <Navigation cantidadCarrito={0} />
            </BrowserRouter>
        );
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('Debe actualizar el contador cuando aumentan los productos', () => {
   
        render(
            <BrowserRouter>
                <Navigation cantidadCarrito={5} />
            </BrowserRouter>
        );
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('Debe tener un enlace al Login de Admin', () => {
        render(
            <BrowserRouter>
                <Navigation cantidadCarrito={0} />
            </BrowserRouter>
        );
        const linkAdmin = screen.getByRole('link', { name: /Admin/i });
        expect(linkAdmin).toBeInTheDocument();

        expect(linkAdmin).toHaveAttribute('href', '/login');
    });
});