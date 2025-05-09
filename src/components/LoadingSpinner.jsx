import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" role="status" className="mb-3">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
      <p>Cargando Pokémon...</p>
    </div>
  );
};

export default LoadingSpinner; 