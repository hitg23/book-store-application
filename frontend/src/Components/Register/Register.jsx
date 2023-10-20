import { Button, TextField } from "@mui/material";
import SearchAppBar from "../SearchAppBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  function handleRegister() {
    axios
      .post(
        "http://localhost:5000/register",
        {
          fullName,
          email,
          username,
          password,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        navigate("/");
      });
  }
  return (
    <div>
      <SearchAppBar />
      <TextField onChange={(e) => setFullName(e.target.value)} />
      <TextField onChange={(e) => setEmail(e.target.value)} />
      <TextField onChange={(e) => setUsername(e.target.value)} />
      <TextField onChange={(e) => setPassword(e.target.value)} />
      <Button variant="outlined" onClick={handleRegister}>
        Register
      </Button>
      <Link to="/register">
        <Button>Already have an account?</Button>
      </Link>
    </div>
  );
}
