import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const MovieCard = ({ movieCard }) => {
    return <>
        <div>
            <Card border="success" style={{ width: '18rem' }}>
                <Card.Header>
                    <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original" + movieCard.poster_path} />
                </Card.Header>
                <Card.Body>
                    <Card.Title>{movieCard.title}</Card.Title>
                    <Card.Text>
                        {movieCard.overview}
                    </Card.Text>
                    <Button variant="success">More</Button>
                </Card.Body>
            </Card>
        </div>

    </>;
}

export default MovieCard;