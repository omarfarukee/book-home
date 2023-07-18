/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom";
import { useGetSingleBooksQuery } from "../../redux/api/apiSlice";

export default function BooksDetails() {
  const { id } = useParams();
  const { data: books, isLoading, error } = useGetSingleBooksQuery(id);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 p-6 bg-green-300">
        <h2 className="text-3xl font-bold mb-4">Name - {books?.Title}</h2>
        <p className="text-xl mb-2">Author- {books?.Author}</p>
        <p className="text-xl mb-2">Genre- {books?.Genre}</p>
        <p className="text-xl mb-2">
          Publication Date- {books?.PublicationDate}
        </p>
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Reviews</h3>
          <ul className="list-disc list-inside">
            <li>Review 1</li>
            <li>Review 2</li>
            <li>Review 3</li>
            <li>Review 3</li>
            <li>Review 3</li>
            <li>Review 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
