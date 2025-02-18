"use client"
type Pagination = {
  items_per_page: number;
  items: any[];
  page: number;
  set_page: (count: number) => void;
};
export default function Pagination(props: Pagination) {
  const { items_per_page, items, page, set_page } = props;
  const handlePreviousPage = () => {
    if (page > 1) set_page(page - 1);
  };
  const handleNextPage = () => {
    const max = Math.ceil(items.length / items_per_page);
    if (page < max) set_page(page + 1);
  };

  return (
    <div className="flex gap-5 justify-center">
      <button
        className="p-2 px-3 border text-gray-600 text-sm bg-white hover:shadow-md hover:bg-gray-800 hover:text-gray-200"
        onClick={handlePreviousPage}
      >
        {"prev"}
      </button>
      <p className="px-4 py-2 border text-sm text-gray-800">{page}</p>
      <button
        className="p-2 px-3 border text-gray-600 text-sm bg-white hover:shadow-md hover:bg-gray-800 hover:text-gray-200"
        onClick={handleNextPage}
      >
        {"next"}
      </button>
    </div>
  );
}
