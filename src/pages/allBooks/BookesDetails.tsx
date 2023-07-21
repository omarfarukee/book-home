/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBooksQuery,
} from "../../redux/api/apiSlice";
import { toast } from "react-hot-toast";

export default function BooksDetails() {
  const { id } = useParams();
  const { data: books, isLoading, error } = useGetSingleBooksQuery(id);

  const navigate = useNavigate();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDelete = () => {
    const proceed = window.confirm("Are you sure, want to delete the book");
    if (proceed && books) {
      deleteBook(books?._id)
        .unwrap()
        .then((response: any) => {
          toast.success("Book deleted successfully");
          console.log("Book deleted successfully:", response);
          navigate("/allBooks");
          location.reload();
        })
        .catch((error: any) => {
          console.error("Error deleting book:", error);
        });
    }
  };

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
          </ul>
        </div>
        <div className="flex justify-between">
          <Link to={`/allBooks/edit/${books?._id}`}>
            <button className="btn btn-neutral">Edit</button>
          </Link>

          <button
            className="btn btn-primary"
            onClick={handleDelete}
            disabled={isDeleting} // Disable the button while the deletion is in progress
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
