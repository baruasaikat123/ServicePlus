import ReactPaginate from 'react-paginate'
import './pagination.css'

const Pagination = ({changePage, pageCount}) => {
    return (
        <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'paginationBttns'}
            nextLinkClassName={'nextBttn'}
            previousLinkClassName={'previousBttn'}
            disabledClassName={'paginationDisabled'}
            activeClassName={'paginationActive'}
          />
    )
}

export default Pagination