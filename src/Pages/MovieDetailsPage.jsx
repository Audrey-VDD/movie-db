import { useParams } from "react-router-dom";
import MoviesServices from "../Services/MoviesServices";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    const navigateTo = (genre)=>{
        // On lui dit qu'on va passer de la page genre aux genres sans que ça apparaisse dans l'URL
        navigate("/genre/"+genre.id, {state : {"genre" : genre}});
    }

    
    return <Container className="d-flex flex-column align-items-center" >
        <h1>{movie.original_title}</h1>
        <img className="mb-3 mt-3" style={{ width: '12rem' }} src={"https://image.tmdb.org/t/p/original" + movie.poster_path} alt="movie-picture" />
        <div className="d-flex flex-row justify-content-center gap-2 mb-3" >
            {movie.genres && movie.genres.map((genre) => {
                return <>
                <Button className='btn-perso fs-6 btn-sm p-1' variant="outline-success" onClick={() => {navigateTo(genre)}}>{genre.name}</Button>
                </>
            })}
        </div>
        
        <p>Résumé : {movie.overview}</p>

        <p>Budget : {movie.budget}$</p>
        <p>Votes : {movie.vote_average} / 10</p>

    </Container>;
}

export default MovieDetailsPage;