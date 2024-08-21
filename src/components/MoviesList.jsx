import { Row } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComponent from "./Pagination";
import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { fetchMovies, totalPage } from '../redux/reducer/moviesReducer';
const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movies);
  useEffect(()=>{
    dispatch(fetchMovies())
    dispatch(totalPage())
  }, [dispatch])
  
  return (
    <Row className="mt-3">
      {loading ? (
        <Spinner animation="border" role="status" style={{ marginTop: "10px" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : movies.length >= 1 ? (
        movies.map((movie, index) => <CardMovie key={index} movie={movie} />)
      ) : (
        <h2>لايوجد افلام....</h2>
      )}

      {movies.length >= 1 ? <PaginationComponent /> : null}
    </Row>
  );
};

export default MoviesList;
