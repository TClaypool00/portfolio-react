import NavBar from './components/Navbar/NavBar';
import './css/App.scss';
import values from './values.json';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ToDo from './pages/ToDo';
import { useRef } from 'react';

function App() {
  const errorMessageRef = useRef(null);

  return (
    <Router>
      <NavBar />
      <div className='main-content'>
        <p ref={errorMessageRef} id='errorMessage'></p>

        <Routes>
          <Route path={values.pages[0].url} element={<Home />} />
          <Route path={values.pages[1].url} element={<ToDo errorMessageRef={errorMessageRef} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
