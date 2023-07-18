/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { useGetAllBooksQuery } from "../../redux/api/apiSlice";
import AllBooksCard from "./AllBooksCard";
export interface IBooks {
  _id: string;
  Title: string;
  Author: string;
  Genre: string;
  PublicationDate: string;
  Reviews?: string[];
}
export default function AllBooksFetch() {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = data?.data?.filter(
    (book: IBooks) =>
      book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.Author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.Genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex p-3">
      <div className="mr-3 border-r-8">
        <div className="flex items-center mt-10">
          <input
            type="text"
            placeholder="Search books by title, author, or genre"
            className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {filteredBooks?.map((book: IBooks) => (
            <AllBooksCard book={book} key={book.Title} />
          ))}
          {filteredBooks?.length === 0 && (
            <p className="text-red-600">
              No books found for the search result.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
