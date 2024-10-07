import { useParams } from "react-router-dom";
import ActorsServices from "../Services/ActorsServices";
import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { Container, Pagination } from "react-bootstrap";

const ActorDetailsPage = () => {
    // On va chercher dans l'url, l'ID pour pouvoir avoir l'ID de l'acteur
    const { id } = useParams();
    const [actor, setActor] = useState({});
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState();

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
            const response = await ActorsServices.getMovieByActorId(currentPage, id);
            setMovies(response.data.results);
            setMaxPage(response.data.total_pages);

            setTimeout(() => {
                window.scrollTo({
                    top: 300,
                    left: 0,
                    behavior: "instant",
                  });
            },50)
            
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchActorById();
    }, [])
    useEffect(() => {
        fetchMovieByActorId()
    }, [currentPage])

    return <Container className="d-flex flex-column align-items-center">

        <div className="d-flex justify-content-center mt-3 mb-3">
            <img style={{ width: '9rem' }} src={"https://image.tmdb.org/t/p/original" + actor.profile_path} alt="picture-actor" />
        </div>
        <div className="d-flex justify-content-center mb-3 mt-3" >
            {actor.name}
        </div>

        <div className="d-flex justify-content-center mb-3 mt-3">
            {actor.birthday}
        </div>
        <div className="d-flex justify-content-center mb-5 mt-3">
            {actor.place_of_birth}
        </div>
        <div className="d-flex justify-content-center mb-6">
            {actor.biography}
        </div>



        <h4>Ses films :</h4>
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

    </Container>;
}

export default ActorDetailsPage;