/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from "react-router-dom";
import { IBooks } from "./AllBooksFecth";

interface IProps {
  book: IBooks;
}

export default function AllBooksCard({ book }: IProps) {
  const { Title, Author, Genre, PublicationDate, _id }: IBooks = book;

  return (
    <>
      <div className="card p-5 border bg-slate-100 shadow-2xl">
        <Link to={`/allBooks/${_id}`}>
          <h2 className="card-title bg-orange-200 p-3 rounded-lg">{Title}</h2>
        </Link>
        <p className="card-author">Author: {Author}</p>
        <p className="card-genre">Genre: {Genre}</p>
        <p className="card-publication">Publication Date: {PublicationDate}</p>
      </div>
    </>
  );
}
