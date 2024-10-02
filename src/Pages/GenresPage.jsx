import { useEffect, useState } from "react";
import GenresServices from "../Services/GenresServices";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const GenresPage = () => {

    const [genres, setGenres] = useState([]);
    const fetchGenres = async () => {
        try {
            const response = await GenresServices.getAllGenres();
            setGenres(response.data.genres);
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchGenres()
    }, []);

    const navigate = useNavigate();
    const navigateTo = (genre)=>{
        // On lui dit qu'on va passer de la page genre aux genres sans que ça apparaisse dans l'URL
        navigate("/genre/"+genre.id, {state : {"genre" : genre}});
    }

    return <>
        <div className="d-flex justify-content-center" >
            <h1>GENRES</h1>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-4" >
            {genres.map((genre) => {
                return <Button variant="secondary" key={genre.id} onClick={() => {navigateTo(genre)}} >{genre.name}</Button>
            })}
        </div>

    </>;
}

export default GenresPage;