import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HomePage from './Pages/HomePage'
import GenresPage from './Pages/GenresPage'
import NavBar from './Components/NavBar';
import MovieDetailsPage from './Pages/MovieDetailsPage';

function App() {


  return <>
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>} />
        <Route path='/genres' element={<GenresPage></GenresPage>} />
        <Route path='/movie/:id' element={<MovieDetailsPage></MovieDetailsPage>}/>
      </Routes>
    </BrowserRouter>
  </>
}

export default App
