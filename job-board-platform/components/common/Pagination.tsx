import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

function Pagination({ total = 1, page = 1, limit = 10, onPrev, onNext, onClickPage }: PaginationProps) {
  const currentPage = page
  const pageCount = Math.ceil(total / limit)

  const getVisiblePages = () => {
    const pages: number[] = []
    for (let i = 1; i <= pageCount; ) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push(i)
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pages.push(-1)
      }
      i += 1
    }
    return pages
  }

  const canNextPage =
    currentPage < pageCount;

  return (
    <div className="px-4 flex justify-end">
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className={`bg-[#F1F1F1] rounded-lg p-1.5 border border-gray-300 ${page === 1 ? 'text-gray-300 cursor-default! bg-gray-200' : 'bg-white'}`}
          onClick={onPrev}
          disabled={page === 1}
        >
          <MdOutlineKeyboardArrowLeft size={20} />
        </button>

        {getVisiblePages().map((page, index) => {
          const id = `dots-${index}`
          return page === -1 ? (
            <span key={id} className="px-3">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={`py-2 px-4 rounded-lg leading-6 cursor-pointer border border-gray-300 ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'bg-white'
              }`}
              onClick={() => {
                if (page !== currentPage) {
                  onClickPage(page)
                }
              }}
            >
              {page}
            </button>
          )
        })}

        <button
          type="button"
          className={` border border-gray-300 rounded-lg p-1.5 ${!canNextPage ? 'text-gray-300 cursor-default! bg-gray-200' : 'bg-white'}`}
          onClick={onNext}
          disabled={!canNextPage}
        >
          <MdOutlineKeyboardArrowLeft size={20} className="rotate-180" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
