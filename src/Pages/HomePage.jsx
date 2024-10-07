import { useEffect, useState } from "react";
import MoviesServices from "../Services/MoviesServices";
import MovieCard from "../Components/MovieCard";
import { Button, Container } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500);
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);

    const fetchMovies = async () => {
        try {
            const response = await MoviesServices.getAllMovies(currentPage);
            setMovies(response.data.results);
            setMaxPage(500);
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                });
            }, 50)

        } catch (error) {

        }
    }
    const searchFilm = async () => {
        if (searchValue == "") {
            fetchMovies();
            setSearching(false);
        } else {
            try {
                const response = await MoviesServices.getMovieByTitle(searchValue, currentPage);
                setMaxPage(response.data.total_pages)
                setMovies(response.data.results);
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "instant",
                    });
                }, 50)
            } catch (error) {
                console.log(error);

            }
        }

    }

    useEffect(() => {
        if (searching == false) {
            fetchMovies();
        } else {
            searchFilm();
        }
    }, [currentPage])



    return <Container className="d-flex flex-column align-items-center">
        <div className="mb-2" >
            <h1>Page d'accueil</h1>

        </div>
        <Form onSubmit={(e) =>{
            e.preventDefault();
            setCurrentPage(1); 
            setSearching(true); 
            searchFilm();
        }} >
            <Form.Label htmlFor="inputPassword5"></Form.Label>
            <Form.Control
                type="text"
                id="search"
                aria-describedby="passwordHelpBlock"
                placeholder="ex : Deadpool"
                className="mb-3"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.currentTarget.value);

                }}
            />
            <Form.Text id="passwordHelpBlock" muted>
            </Form.Text>
        </Form>
        <Button variant="outline-success" className="btn-perso fs-6 btn-sm p-1 mb-3" onClick={() => { setCurrentPage(1); setSearching(true); searchFilm() }}>VALIDER</Button>

        <div className="d-flex justify-content-center flex-wrap gap-4" >
            {movies.map((movie) => {
                return <MovieCard movieCard={movie} key={movie.id} ></MovieCard>
            })}
        </div>

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

    </Container>;
}
export default HomePage;