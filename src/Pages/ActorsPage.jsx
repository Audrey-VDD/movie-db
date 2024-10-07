import ActorsServices from "../Services/ActorsServices";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActorCard from "../Components/ActorCard";
import { Pagination } from "react-bootstrap";



const ActorsPage = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500);
    const [actors, setActors] = useState([]);

    const fetchActors = async () => {
        try {
            const response = await ActorsServices.getAllActors(currentPage);
            setActors(response.data.results);

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
    useEffect(() => {
        fetchActors()
    }, [currentPage]);

    const navigate = useNavigate();
    const navigateTo = (actor) => {
        navigate("/actors/" + actor.id);
    }

    return <>
        <div className="d-flex justify-content-center flex-wrap gap-4" >
            <h1>Acteurs / Actrices</h1>
        </div>
        <div className="d-flex justify-content-center flex-wrap gap-4" >
            {actors.map((actor) => {
                return <ActorCard actorCard={actor} key={actor.id} onClick={() => { navigateTo(actor.id) }} ></ActorCard>
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

export default ActorsPage;