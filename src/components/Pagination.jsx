import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector} from "react-redux";
import { getPage } from '../redux/reducer/moviesReducer';



const PaginationComponent = () => {
  const dispatch = useDispatch();
  const { movies ,totalPages } = useSelector((state) => state.movies);
  console.log(movies)

  const handlePageClick = (data) => {
    dispatch(getPage(data.selected+1))
  }
  
  
  return (
    <ReactPaginate
            breakLabel="..."
            nextLabel="التالى"
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            pageCount={totalPages}
            previousLabel="السابق"
            containerClassName={"pagination justify-content-center p-3"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
        />
  )
}

export default PaginationComponent;
