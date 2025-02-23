'use client'

const Pagination = ({ currentPage, totalTrains, trainsPerPage, paginate }) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage * trainsPerPage >= totalTrains}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
