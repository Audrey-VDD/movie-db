import { useParams } from "react-router-dom";
import ActorsServices from "../Services/ActorsServices";
import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { Pagination } from "react-bootstrap";

const ActorDetailsPage = () => {
    const { id } = useParams();
    const [actor, setActor] = useState({});
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(20);

    const fetchActorById = async () => {
        try {
            const response = await ActorsServices.getActorByID(id);
            setActor(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const fetchMovieByActorId = async () => {
        try {
            const response = await ActorsServices.getMovieByActorId(id);
            setMovies(response.data.results);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        fetchActorById(); fetchMovieByActorId()
    }, [currentPage])

    return <>

        <div className="d-flex justify-content-center" >
            {actor.name}
        </div>


        <img style={{ width: '9rem' }} src={"https://image.tmdb.org/t/p/original" + actor.profile_path} alt="picture-actor" />

        <img src="" alt="" />
        <div className="d-flex flex-column align-items-center col-6" >
            <p>{actor.birthday}</p>
            <p>{actor.place_of_birth}</p>
            <p>Bio : {actor.biography}</p>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-4" >
            {movies.map((movie) => {
                return <MovieCard movieCard={movie} key={movie.id} ></MovieCard>
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

export default ActorDetailsPage;