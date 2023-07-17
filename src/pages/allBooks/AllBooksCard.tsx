/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IBooks } from "./AllBooksFecth";

interface IProps {
  book: IBooks;
}

export default function AllBooksCard({ book }: IProps) {
  const { Title, Author, Genre, PublicationDate }: IBooks = book;

  return (
    <div className="card p-5 border bg-slate-100">
      <h2 className="card-title">{Title}</h2>
      <p className="card-author">Author: {Author}</p>
      <p className="card-genre">Genre: {Genre}</p>
      <p className="card-publication">Publication Date: {PublicationDate}</p>
    </div>
  );
}
