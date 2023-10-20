import { createContext, useState } from "react";
import { bookData } from "./data";

export const BookContext = createContext();
export const BookProvider = (props) => {
  const [BooksData, setBooksData] = useState(bookData);
  const [BooksDetail, setBooksDetail] = useState(bookData[0]);

  return (
    <BookContext.Provider
      value={{
        BooksData,
        setBooksData,
        BooksDetail,
        setBooksDetail,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};
