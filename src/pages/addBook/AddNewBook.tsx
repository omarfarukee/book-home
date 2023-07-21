/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePostNewBooksMutation } from "../../redux/api/apiSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

interface Book {
  Title: string;
  Email?: string | null;
  Author: string;
  Genre: string;
  PublicationDate: Date | null;
  Reviews?: string[];
}

const NewBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState<Date | null>(null);
  const [reviews, setReviews] = useState<string[]>();

  const { user } = useAppSelector((state) => state.user);
  const email = user?.email;

  const [postNewBooks, { isLoading, isError, isSuccess }] =
    usePostNewBooksMutation();

  console.log(isLoading);
  console.log(isError);
  console.log(isSuccess);
  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook: Book = {
      Email: email,
      Title: title,
      Author: author,
      Genre: genre,
      PublicationDate: publicationDate,
      Reviews: reviews,
    };
    try {
      await postNewBooks(newBook);
      toast.success("Book added successfully!");
      navigate("/allBooks");
      location.reload();
    } catch (error) {
      toast.error("Error adding book:");
    }

    console.log(newBook);
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublicationDate(null);
    setReviews([]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter the book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            placeholder="Enter the book author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="genre"
          >
            Genre:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="genre"
            type="text"
            placeholder="Enter the book genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="publicationDate"
          >
            Publication Date:
          </label>
          <DatePicker
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="publicationDate"
            selected={publicationDate}
            onChange={(date: Date | null) => setPublicationDate(date)}
            placeholderText="Select publication date"
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default NewBookForm;
