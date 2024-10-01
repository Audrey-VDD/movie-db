import { useEffect, useState } from "react";
import MoviesServices from "../Services/MoviesServices";
import MovieCard from "../Components/MovieCard";
import { Container } from "react-bootstrap";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const fetchMovies = async () => {
        try {
            const response = await MoviesServices.getAllMovies();
            setMovies(response.data.results);
            
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])



    return <Container className="d-flex flex-column align-items-center">
        <h1>Page d'accueil</h1>

        <div className="d-flex justify-content-center flex-wrap gap-4" >
            {movies.map((movie) => {
                return <MovieCard movieCard={movie} key={movie.id} ></MovieCard>
            })}
        </div>


    </Container>;
}
export default HomePage;