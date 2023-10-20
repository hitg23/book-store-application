import {
  Alert,
  Button,
  Input,
  Snackbar,
  TextField,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchAppBar from "../SearchAppBar";

export default function DetailEditPage() {
  const location = useLocation();
  const type = location.state.type;
  const bookInfo = location.state.book;

  const [createBook, setCreateBook] = useState({
    _id: bookInfo?._id,
    title: bookInfo?.title,
    author: bookInfo?.author,
    edition: bookInfo?.edition,
    aboutAuthor: bookInfo?.aboutAuthor,
  });

  const [editBook, setEditBook] = useState({
    _id: bookInfo?._id,
    imageURL: bookInfo?.imageURL,
    title: bookInfo?.title,
    author: bookInfo?.author,
    price: bookInfo?.price,
    edition: bookInfo?.edition,
    publisher: bookInfo?.publisher,
    aboutAuthor: bookInfo?.aboutAuthor,
  });
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handelChange(e) {
    setEditBook({ ...editBook, [e.target.name]: e.target.value });
  }

  function handelCreateChange(e) {
    setCreateBook({ ...createBook, [e.target.name]: e.target.value });
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    axios
      .put("http://localhost:5000/" + editBook._id, editBook, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        handleClick();
      });
  }
  function handleCreateSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/", createBook, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        alert("Saved");
      });
  }
  return (
    <div>
      <SearchAppBar />
      {type === "create" ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            margin: "50px 20%",
          }}
          onSubmit={handleCreateSubmit}
        >
          <TextField
            name="imageURL"
            placeholder="Cover Image URL"
            onChange={handelCreateChange}
            label="Cover Image URL"
          />
          <TextField
            name="title"
            placeholder="Title"
            onChange={handelCreateChange}
            label="Title"
          />
          <TextField
            name="author"
            placeholder="Author"
            label="Author"
            onChange={handelCreateChange}
          />
          <TextField
            name="price"
            placeholder="Price"
            label="Price"
            onChange={handelCreateChange}
          />
          <TextField
            name="edition"
            placeholder="Edition"
            label="Edition"
            onChange={handelCreateChange}
          />
          <TextField
            name="publisher"
            placeholder="Publisher"
            label="Publisher"
            onChange={handelCreateChange}
          />
          <TextField
            multiline
            minRows={5}
            name="aboutAuthor"
            placeholder="About the Author"
            label="About the Author"
            onChange={handelCreateChange}
          />
          <Button type="reset">Reset</Button>
          <Button type="submit">Save</Button>
        </form>
      ) : type === "edit" ? (
        <div>
          {
            <form
              onSubmit={handleEditSubmit}
              style={{
                margin: 50,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <TextField
                name="imageURL"
                label="Cover image URL"
                value={editBook.imageURL}
                onChange={handelChange}
              />
              <TextField
                name="title"
                label="Title"
                value={editBook.title}
                onChange={handelChange}
              />
              <TextField
                name="price"
                label="Price"
                value={editBook.price}
                onChange={handelChange}
              />
              <TextField
                name="author"
                label="Author"
                value={editBook.author}
                onChange={handelChange}
              />
              <TextField
                name="edition"
                label="Edition"
                value={editBook.edition}
                onChange={handelChange}
              />
              <TextField
                name="publisher"
                label="Publisher"
                value={editBook.publisher}
                onChange={handelChange}
              />
              <TextField
                multiline
                minRows={5}
                name="aboutAuthor"
                label="About the author"
                value={editBook.aboutAuthor}
                onChange={handelChange}
              />
              <Button type="submit">Save</Button>
            </form>
          }
        </div>
      ) : (
        <div
          style={{
            margin: 50,
            display: "flex",
            flexDirection: "column",
            fontSize: "21px",
            gap: 10,
          }}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <img width={250} src={bookInfo.imageURL} alt={bookInfo.title} />
          </div>
          <div>Title: {bookInfo.title}</div>
          <div>Author: {bookInfo.author}</div>
          <div>Edition: {bookInfo.edition}</div>
          <div>Price: {bookInfo.price}</div>
          <div>Publisher: {bookInfo.publisher}</div>
          <div>About the author: {bookInfo.aboutAuthor}</div>
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully Edited
        </Alert>
      </Snackbar>
    </div>
  );
}
