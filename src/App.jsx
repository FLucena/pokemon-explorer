import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Explore from './pages/Explore'
import Game from './pages/Game'
import Team from './pages/Team'

const Navigation = () => {
  const location = useLocation();
  
  return (
    <div className="tabs">
      <Link 
        to="/"
        className={`tab-button ${location.pathname === '/' ? 'active' : ''}`}
      >
        Explorar
      </Link>
      <Link 
        to="/game"
        className={`tab-button ${location.pathname === '/game' ? 'active' : ''}`}
      >
        Juego
      </Link>
      <Link 
        to="/team"
        className={`tab-button ${location.pathname === '/team' ? 'active' : ''}`}
      >
        Constructor de Equipo
      </Link>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    document.title = 'Pokémon Explorer | Explora y Adivina Pokémon';
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="container">
          <Navigation />
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/game" element={<Game />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App
