/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBooksQuery } from "../../redux/api/apiSlice";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../../redux/hook";
interface Book {
  preventDefault: any;
  Email?: string | null;
  Title?: string;
  Author?: string;
  Genre?: string;
  PublicationDate?: Date | null;
  Reviews?: string[];
}
export default function EditBooks() {
  const { id } = useParams();
  const { data: books } = useGetSingleBooksQuery(id);
  const [bookData, setBooksData] = useState(books);

  const { user } = useAppSelector((state) => state.user);
  const email = user?.email;
  const handleUpdate = (event: Book) => {
    event.preventDefault();

    if (email === books?.Email) {
      fetch(`https://books-home-server.vercel.app/allBooks/${books?._id}`, {
        method: "PATCH",
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
    } else {
      toast.error("your are not authorized to edit this book");
    }
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
                name="Author"
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
