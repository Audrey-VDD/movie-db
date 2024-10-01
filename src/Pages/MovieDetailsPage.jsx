import { useParams } from "react-router-dom";
import MoviesServices from "../Services/MoviesServices";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});



    const fetchMovieById = async () => {
        try {
            const response = await MoviesServices.getMovieByID(id);
            console.log(response.data);

            setMovie(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchMovieById();
    }, [])



    return <Container className="d-flex flex-column align-items-center" >
        <h1>{movie.original_title}</h1>
        <div className="d-flex flex-row justify-content-center gap-2" >
            {movie.genres && movie.genres.map((genre) => {
                return <>
                    <p>{genre.name}</p>
                </>
            })}
        </div>
        <p>Résumé : {movie.overview}</p>

        <p>Budget : {movie.budget}$</p>

    </Container>;
}

export default MovieDetailsPage;