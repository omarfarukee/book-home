/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/api/apiSlice";
import { IBooks } from "./allBooks/AllBooksFecth";

export default function Home() {
  const { data } = useGetAllBooksQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.data.slice(-10).reverse(), // Limiting to 10 and reversing the order
    }),
  });

  return (
    <div>
      <div className="flex justify-center mt-10 text-3xl font-bold">
        <h1 className="text-orange-500">here the latest added top 10 books</h1>
      </div>
      {data ? (
        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20 p-10">
          {data?.map((homes: IBooks) => (
            <div key={homes?._id} className="card p-5 border bg-slate-100">
              <Link to={`/allBooks/${homes?._id}`}>
                <h2 className="card-title bg-orange-200 p-3 rounded-lg">
                  {homes?.Title}
                </h2>
              </Link>
              <p className="card-author">Author: {homes?.Author}</p>
              <p className="card-genre">Genre: {homes?.Genre}</p>
              <p className="card-publication">
                Publication Date: {homes?.PublicationDate}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
}
