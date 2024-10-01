import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movieCard }) => {
    const navigate = useNavigate();
    const navigateTo = (id)=>{
        navigate("/movie/"+id);
    }
    return <>
        <div className='col-3 d-flex justify-content-center' >
            <Card border="success" style={{ width: '12rem' }} onClick={() => {navigateTo(movieCard.id)}}>
                <Card.Header>
                    <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original" + movieCard.poster_path} />
                </Card.Header>
                <Card.Body>
                    <Card.Title className='fs-5' >{movieCard.title}</Card.Title>
                    {/* <Card.Text>
                        {movieCard.overview}
                    </Card.Text> */}
                    <Button className='btn-perso fs-6 btn-sm p-1' variant="outline-success" >Résumé</Button>
                </Card.Body>
            </Card>
        </div>

    </>;
}

export default MovieCard;