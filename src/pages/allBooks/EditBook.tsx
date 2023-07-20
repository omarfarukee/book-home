/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleBooksQuery } from "../../redux/api/apiSlice";
import { toast } from "react-hot-toast";

export default function EditBooks() {
  const { id } = useParams();
  const { data: books, isLoading, error } = useGetSingleBooksQuery(id);
  const [bookData, setBooksData] = useState(books);
  console.log(bookData?.Author);

  const handleUpdate = (event: any) => {
    event.preventDefault();

    fetch(`http://localhost:5000/allBooks/${books?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((res) => res.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.modifiedCount > 0) {
          toast.success("successfully updated");
        }
      });
  };

  const handleChange = (event: any) => {
    const filed = event.target.name;
    const value = event.target.value;
    const newData = { ...bookData };
    newData[filed] = value;
    setBooksData(newData);
    console.log(newData);
  };

  return (
    <>
      <div className="w-full mb-5 border-l-4 mt-10 ml-6">
        <div className="flex justify-center">
          <form className="w-full" onSubmit={handleUpdate}>
            <div className="">
              <input
                onChange={handleChange}
                name="Title"
                placeholder="Title"
                defaultValue={books?.Title}
                className="mt-2 input input-bordered w-full "
              />{" "}
              <br />
              <input
                onChange={handleChange}
                name="author"
                placeholder="Author"
                defaultValue={books?.Author}
                className="mt-2 input input-bordered w-full "
              />{" "}
              <br />
              <input
                onChange={handleChange}
                name="Genre"
                placeholder="Genre"
                defaultValue={books?.Genre}
                className="mt-2 input input-bordered w-full "
              />{" "}
              <br />
              <input
                onChange={handleChange}
                name="PublicationDate"
                placeholder="Publication date"
                defaultValue={books?.PublicationDate}
                className="mt-2 input input-bordered w-full "
              />{" "}
              <br />
            </div>

            <div className="flex justify-center">
              <button className="btn btn-success mt-3 w-96">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
