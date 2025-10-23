import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Formulario from './Formulario';

beforeEach(() => {
  sessionStorage.clear();
});

describe('Formulario Component', () => {
  test('renders form fields correctly', () => {
    render(<Formulario />);

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha de nacimiento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comentarios/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });

  test('submit button is disabled when fields are empty', () => {
    render(<Formulario />);
    const submitButton = screen.getByRole('button', { name: /agregar/i });

    expect(submitButton).toBeDisabled();
  });

  test('shows validation error for invalid name characters', async () => {
    render(<Formulario />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    fireEvent.change(nameInput, { target: { value: 'Juan123' } });

    const dateInput = screen.getByLabelText(/fecha de nacimiento/i);
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });

    const commentInput = screen.getByLabelText(/comentarios/i);
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    const submitButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Usa solo letras/i);
    });
  });

  test('shows validation error for empty name', async () => {
    render(<Formulario />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    fireEvent.change(nameInput, { target: { value: '   ' } });

    const dateInput = screen.getByLabelText(/fecha de nacimiento/i);
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });

    const commentInput = screen.getByLabelText(/comentarios/i);
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    const submitButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/no puede estar vacío/i);
    });
  });

  test('accepts valid name with accents and spaces', async () => {
    render(<Formulario />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    fireEvent.change(nameInput, { target: { value: 'José María García' } });

    const dateInput = screen.getByLabelText(/fecha de nacimiento/i);
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });

    const commentInput = screen.getByLabelText(/comentarios/i);
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    const submitButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('José María García')).toBeInTheDocument();
    });
  });

  test('validates date is not before 1900', async () => {
    render(<Formulario />);

    const dateInput = screen.getByLabelText(/fecha de nacimiento/i);
    expect(dateInput).toHaveAttribute('min', '1900-01-01');
  });

  test('validates date is not in the future', () => {
    render(<Formulario />);

    const dateInput = screen.getByLabelText(/fecha de nacimiento/i);
    const today = new Date().toISOString().split('T')[0];

    expect(dateInput).toHaveAttribute('max', today);
  });

  test('accepts valid special characters in comments', async () => {
    render(<Formulario />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    fireEvent.change(nameInput, { target: { value: 'Juan Perez' } });

    const dateInput = screen.getByLabelText(/fecha de nacimiento/i);
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });

    const commentInput = screen.getByLabelText(/comentarios/i);
    fireEvent.change(commentInput, { target: { value: "Test: @user, $100 & good; ¿ok?" } });

    const submitButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Test: @user/)).toBeInTheDocument();
    });
  });

  test('displays person card with correct format after submission', async () => {
    render(<Formulario />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Juan Perez' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '2000-04-30' } });
    fireEvent.change(screen.getByLabelText(/comentarios/i), { target: { value: 'Me gusta programar.' } });

    const submitButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Juan Perez')).toBeInTheDocument();
      expect(screen.getByText(/30\/04\/2000/)).toBeInTheDocument();
      expect(screen.getByText(/Edad:/)).toBeInTheDocument();
      expect(screen.getByText(/Me gusta programar/)).toBeInTheDocument();
    });
  });

  test('calculates age correctly', async () => {
    render(<Formulario />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Maria Lopez' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/comentarios/i), { target: { value: 'Test' } });

    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));

    await waitFor(() => {
      const currentYear = new Date().getFullYear();
      const expectedAge = currentYear - 2000;
      expect(screen.getByText(new RegExp(`${expectedAge} años`))).toBeInTheDocument();
    });
  });

  test('clears form after successful submission', async () => {
    render(<Formulario />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    const dateInput = screen.getByLabelText(/fecha de nacimiento/i);
    const commentInput = screen.getByLabelText(/comentarios/i);

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(dateInput).toHaveValue('');
      expect(commentInput).toHaveValue('');
    });
  });

  test('prevents duplicate entries', async () => {
    render(<Formulario />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Juan Perez' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/comentarios/i), { target: { value: 'First comment' } });

    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));

    await waitFor(() => {
      expect(screen.getByText('Juan Perez')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Juan Perez' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/comentarios/i), { target: { value: 'Second comment' } });

    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Ya existe este registro/i);
    });
  });

  test('persists data to sessionStorage', async () => {
    render(<Formulario />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/comentarios/i), { target: { value: 'Test comment' } });

    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));

    await waitFor(() => {
      const stored = sessionStorage.getItem('personas');
      expect(stored).toBeTruthy();
      const data = JSON.parse(stored);
      expect(data).toHaveLength(1);
      expect(data[0].nombre).toBe('Test User');
    });
  });

  test('loads data from sessionStorage on mount', () => {
    const mockData = [{
      id: '123',
      nombre: 'Stored User',
      fecha: '2000-01-01',
      comentarios: 'Stored comment',
      creadoEn: Date.now()
    }];

    sessionStorage.setItem('personas', JSON.stringify(mockData));

    render(<Formulario />);

    expect(screen.getByText('Stored User')).toBeInTheDocument();
    expect(screen.getByText(/Stored comment/)).toBeInTheDocument();
  });

  test('displays multiple person cards', async () => {
    render(<Formulario />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'First Person' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/comentarios/i), { target: { value: 'First comment' } });
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));

    await waitFor(() => {
      expect(screen.getByText('First Person')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Second Person' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '1995-05-15' } });
    fireEvent.change(screen.getByLabelText(/comentarios/i), { target: { value: 'Second comment' } });
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));

    await waitFor(() => {
      expect(screen.getByText('First Person')).toBeInTheDocument();
      expect(screen.getByText('Second Person')).toBeInTheDocument();
    });
  });
});
