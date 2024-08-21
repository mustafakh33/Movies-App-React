import { Container, Col, Row } from "react-bootstrap";
import logo from '../images/logo.png'
import { useDispatch } from "react-redux";
import { fetchMovies, searchMovies } from "../redux/reducer/moviesReducer";
import { Link } from "react-router-dom";
const NavBar = () => {
  const dispatch = useDispatch();
  const search = (word) => {
    if (word === "") {
      dispatch(fetchMovies())
    } else{
      dispatch(searchMovies(word))
    }
  }
  
  return (
    <div className="nav-style w-100">
      <Container>
        <Row className="pt-2 ">
          <Col xs="2" lg="1">
            <Link href="/">
              <img className="logo" src={logo} alt="dfs" />
            </Link>
          </Col>
          <Col xs="10" lg="11" className=" d-flex align-items-center">
            <div className="search  w-100">
              <i className="fa fa-search"></i> 
              <input onChange={(e) => {
                search(e.target.value);
              }
              }  type="text" className="form-control" placeholder="ابحث" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;