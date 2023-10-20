import { Button, TextField } from "@mui/material";
import SearchAppBar from "../SearchAppBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleLogin() {
    axios
      .post(
        "http://localhost:5000/login",
        { username, password },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/list-page");
      });
  }
  return (
    <div>
      <SearchAppBar />
      <TextField onChange={(e) => setUsername(e.target.value)} />
      <TextField onChange={(e) => setPassword(e.target.value)} />
      <Button variant="outlined" onClick={handleLogin}>
        Login
      </Button>
      <Link to="/register">
        <Button>Don't have an account? Please Register here</Button>
      </Link>
    </div>
  );
}
