/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useState } from "react";
import { useGetAllBooksQuery } from "../../redux/api/apiSlice";
import AllBooksCard from "./AllBooksCard";

export interface IBooks {
  _id: string;
  Email?: string | null;
  Title: string;
  Author: string;
  Genre: string;
  PublicationDate: string;
  Reviews?: string[];
}

export default function AllBooksFetch() {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [publicationYearFilter, setPublicationYearFilter] = useState("");

  const filteredBooks = data?.data?.filter(
    (book: IBooks) =>
      (book.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Author?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!genreFilter ||
        book.Genre?.toLowerCase().includes(genreFilter.toLowerCase())) &&
      (!publicationYearFilter ||
        book.PublicationDate.includes(publicationYearFilter))
  );

  return (
    <div className="flex p-3">
      <div className="mr-3 border-r-8">
        <div className="flex items-center mt-10">
          <input
            type="text"
            placeholder="Search books by title, author"
            className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
            Search
          </button>
        </div>

        <div className="p-3 rounded-lg mr-3 w-80 mt-10 bg-slate-300">
          <p className="text-2xl font-bold mb-5">
            search book with date and genre
          </p>
          <div className="flex items-center mb-4">
            <label htmlFor="genreFilter" className="mr-2">
              Filter by Genre:
            </label>
            <input
              type="text"
              id="genreFilter"
              placeholder="Enter genre..."
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none"
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="publicationYearFilter" className="mr-2">
              Filter by Publication Year:
            </label>
            <input
              type="text"
              id="publicationYearFilter"
              placeholder="Enter publication year..."
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none"
              value={publicationYearFilter}
              onChange={(e) => setPublicationYearFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        {!filteredBooks ? (
          <div className="ml-96">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
