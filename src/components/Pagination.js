import { useMemo } from 'react'
import '../css/style.css'

const Pagination = ({ currentPage, totalPages, onPageChange}) => {
    const pages = useMemo(() => {
        let arr = [];
        for (let i = 1; i <= totalPages; i++) {
            arr.push(i);
        }
        return arr;
    }, [totalPages])

    return (
        <div className=" flex justify-center items-center">
            <div className='pagination mt-10'>

                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">
                    &lt;
                </button>

                {/* <div className='pagination flex space-x-1'>
                    {pages.map((page) => (
                        <button key={page} 
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-md transition-all w-10 text-center ${
                            page === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                            {page}
                        </button>
                    ))}
                </div> */}


                <div className=' flex space-x-1'>
                    {pages.map((page) => (
                        <button key={page} 
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-md transition-all w-10 text-center ${
                            page === currentPage ? 'active' : ''}`}>
                            {page}
                        </button>
                    ))}
                </div>

                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">
                    &gt;
                </button>
            </div>
        </div>
    )
}

export default Pagination;