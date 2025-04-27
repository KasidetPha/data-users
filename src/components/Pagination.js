import { useMemo } from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange}) => {
    const pages = useMemo(() => {
        let arr = [];
        for (let i = 1; i <= totalPages; i++) {
            arr.push(i);
        }
        return arr;
    }, [totalPages])

    return (
        <div className="flex justify-center items-center gap-4 mt-4">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">
                Prev
            </button>

            <div className='flex space-x-1'>
                {pages.map((page) => (
                    <button key={page} 
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded-md transition-all ${
                        page === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                        {page}
                    </button>
                ))}
            </div>

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">
                Next
            </button>
        </div>
    )
}

export default Pagination;