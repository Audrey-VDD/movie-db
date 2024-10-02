import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";

const ActorCard = ({actorCard}) => {
    const navigate = useNavigate();
    const navigateTo = (id) => {
        navigate("/actors/"+id);
    }


    return <>
        <div className='col-3 d-flex justify-content-center' >
            <Card border="success" style={{ width: '12rem' }} onClick={() => { navigateTo(actorCard.id) }}>
                <Card.Header>
                    <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original"+actorCard.profile_path} />
                </Card.Header>
                <Card.Body>
                    <Card.Title className='fs-5' >{actorCard.name}</Card.Title>
                    <Button className='btn-perso fs-6 btn-sm p-1' variant="outline-success" >Infos..</Button>
                </Card.Body>
            </Card>
        </div>


        

    </>;
}

export default ActorCard;