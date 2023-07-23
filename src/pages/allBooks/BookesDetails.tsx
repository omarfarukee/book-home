/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBooksQuery,
  usePostReviewsMutation,
} from "../../redux/api/apiSlice";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
interface IReviews {
  bookId: string;
  email?: string | null;
  reviews?: string;
}
export default function BooksDetails() {
  const [revData, setRevData] = useState<IReviews[]>([]);

  const { id } = useParams();

  const { data: books, isLoading } = useGetSingleBooksQuery(id);

  const navigate = useNavigate();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const email = user?.email;

  const handleDelete = () => {
    const proceed = window.confirm("Are you sure, want to delete the book");
    if (proceed && books) {
      if (email === books?.Email) {
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
      } else {
        toast.error("your are not authorized to delete this book");
      }
    }
  };
  const [review, setReview] = useState("");

  const [postReviews, { isError, isSuccess }] = usePostReviewsMutation();
  console.log(isLoading);
  console.log(isError);
  console.log(isSuccess);
  const bookId = books?._id;
  const handleReviewSubmit = async () => {
    if (email) {
      const newReviews: IReviews = {
        bookId: bookId,
        email: email,
        reviews: review,
      };
      try {
        await postReviews(newReviews);
        toast.success("reviews added successfully!");
        location.reload();
      } catch (error) {
        toast.error("Error adding book:");
      }
    } else {
      toast.error("please login first to review this book");
    }
  };

  useEffect(() => {
    fetch(`https://books-home-server.vercel.app/reviews/${bookId}`)
      .then((response) => response.json())
      .then((data) => setRevData(data))
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [bookId]);
  console.log(revData);

  return (
    <div className="flex justify-center items-center h-screen mt-40 mb-24">
      <div className="w-1/3 p-6 shadow-2xl mb-10 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">Books Name: {books?.Title}</h2>
        <p className="text-xl mb-2">Author: {books?.Author}</p>
        <p className="text-xl mb-2">Genre: {books?.Genre}</p>
        <p className="text-xl mb-2">
          Publication Date: {books?.PublicationDate}
        </p>
        <div className="flex justify-between">
          <Link to={`/allBooks/edit/${books?._id}`}>
            <button className="btn btn-neutral">Edit books</button>
          </Link>

          <button
            className="btn btn-primary"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete book"}
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Reviews</h3>

          <div>
            {revData?.map((review: any) => (
              <div>
                <p className="rounded-tr-lg bg-slate-100 shadow-2xl mt-2 p-3">
                  <span className="flex items-center border-b-4 mb-3 font-bold">
                    <FaUserCircle></FaUserCircle>
                    <small className="ml-3">{review?.email}</small>
                  </span>
                  -- {review?.reviews}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Add a Review</h3>
          <textarea
            className="w-full border p-3 rounded-md"
            rows={4}
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={handleReviewSubmit}
            disabled={!review}
          >
            Submit Review.
          </button>
        </div>
      </div>
    </div>
  );
}
