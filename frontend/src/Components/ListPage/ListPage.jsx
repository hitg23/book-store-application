import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, CardContent, Snackbar } from "@mui/material";
import SearchAppBar from "../SearchAppBar";
import axios from "axios";

export default function ListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (searchKey) {
      axios
        .get("http://localhost:5000/" + searchKey, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          setData(res.data);
        });
    } else {
      axios
        .get("http://localhost:5000", {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          setData(res.data);
        });
    }
  }, [searchKey]);

  function handleDelete(id) {
    axios
      .delete("http://localhost:5000/" + id, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        handleClick();
        axios
          .get("http://localhost:5000", {
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
          })
          .then((res) => {
            setData(res.data);
          });
      });
  }

  return (
    <div>
      <SearchAppBar showSearch={true} setSearchKey={setSearchKey} />
      <Button
        onClick={() => navigate("/detail-edit", { state: { type: "create" } })}
      >
        Create
      </Button>

      {data.map((book) => (
        <Card
          sx={{ minWidth: 275, margin: 5 }}
          onClick={() =>
            navigate("/detail-edit", { state: { type: "view", book } })
          }
        >
          <CardContent>
            <img width={150} src={book.imageURL} alt={book.title} />
            <div>{book.title}</div>
            <div>{book.author}</div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/detail-edit", { state: { type: "edit", book } });
              }}
            >
              Edit
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("Are you sure you want to delete?")) {
                  handleDelete(book._id);
                }
              }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully Deleted
        </Alert>
      </Snackbar>
    </div>
  );
}
