import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenresServices from "../Services/GenresServices";
import MovieCard from "../Components/MovieCard";

const GenreDetails = () => {
    // récupère id de mon /genre/:id
    const { id } = useParams();
    const [movies, setMovies] = useState([]);


    const fetchMoviesByGenreId = async () => {
        try {
            const response = await GenresServices.getMoviesByGenreId(1, id);
            setMovies(response.data.results);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchMoviesByGenreId();
    }, [])

    return <>
        <div className="d-flex justify-content-center" >
            <h1>Liste des films </h1>
        </div>
        <div className="d-flex justify-content-center flex-wrap gap-4" >
            {movies.map((movie) => {
                return <MovieCard movieCard={movie} key={movie.tittle}></MovieCard>
            })}
        </div>


    </>;
}

export default GenreDetails;