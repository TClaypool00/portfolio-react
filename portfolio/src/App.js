import NavBar from './components/Navbar/NavBar';
import './css/App.scss';
import values from './values.json';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ToDo from './pages/ToDo';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={values.pages[0].url} element={<Home />} />
        <Route path={values.pages[1].url} element={<ToDo />} />
      </Routes>
    </Router>
  );
}

export default App;
