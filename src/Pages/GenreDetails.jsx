import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GenresServices from "../Services/GenresServices";
import MovieCard from "../Components/MovieCard";
import Pagination from 'react-bootstrap/Pagination';

const GenreDetails = () => {
    // récupère id de mon /genre/:id
    const { id } = useParams();
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500);


    const fetchMoviesByGenreId = async () => {
        try {
            const response = await GenresServices.getMoviesByGenreId(currentPage, id);
            setMovies(response.data.results);
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                  });
            },50)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchMoviesByGenreId();
    }, [currentPage])

    
    
    return <>
        <div className="d-flex justify-content-center" >
            <h1>{location.state.genre.name}</h1>
            
        </div>
        <div className="d-flex justify-content-center flex-wrap gap-4" >
            {movies.map((movie) => {
                return <MovieCard movieCard={movie} key={movie.tittle} ></MovieCard>
            })}
        </div>

        <div className="d-flex flex-column align-items-center" >
            <Pagination className="mt-5" >
                {currentPage > 1 && <>
                    <Pagination.First onClick={() => { setCurrentPage(1) }} />
                    <Pagination.Prev onClick={() => { setCurrentPage(currentPage - 1) }} />
                    <Pagination.Item onClick={() => { setCurrentPage(1) }} >{1}</Pagination.Item>
                </>}

                {currentPage - 5 > 0 && <>
                    <Pagination.Ellipsis onClick={() => { setCurrentPage(currentPage - 5) }} />
                </>}

                {(currentPage != 2 && currentPage > 1) && <>
                    <Pagination.Item onClick={() => { setCurrentPage(currentPage - 1) }}>{currentPage - 1}</Pagination.Item>
                </>}

                <Pagination.Item active>{currentPage}</Pagination.Item>

                {currentPage + 1 < maxPage && <>
                    <Pagination.Item onClick={() => { setCurrentPage(currentPage + 1) }}>{currentPage + 1}</Pagination.Item>
                </>}

                {currentPage + 5 <= maxPage && <>
                    <Pagination.Ellipsis onClick={() => { setCurrentPage(currentPage + 5) }} />
                </>}

                {currentPage < maxPage && <>
                    <Pagination.Item onClick={() => { setCurrentPage(maxPage) }} >{maxPage}</Pagination.Item>
                    <Pagination.Next onClick={() => { setCurrentPage(currentPage + 1) }} />
                    <Pagination.Last onClick={() => { setCurrentPage(maxPage) }} />

                </>}

            </Pagination>
        </div>



    </>;
}

export default GenreDetails;