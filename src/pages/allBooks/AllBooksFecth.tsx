/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { useGetAllBooksQuery } from "../../redux/api/apiSlice";
import AllBooksCard from "./AllBooksCard";
export interface IBooks {
  Title: string;
  Author: string;
  Genre: string;
  PublicationDate: string;
  Reviews: string[];
}
export default function AllBooksFetch() {
  const { data, isLoading } = useGetAllBooksQuery(undefined);

  console.log(data);
  return (
    <div className="flex justify-center mt-10">
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {data?.data?.map((book: IBooks) => (
          <AllBooksCard book={book} />
        ))}
      </div>
    </div>
  );
}
