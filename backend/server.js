const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

// midlle ware
app.use(express.json());
app.use(cors());

const secret = "SECRET";
const mongoURL = `mongodb+srv://tiegistula:Sayte5888@employee-app.j9n0jnt.mongodb.net/bookstore?retryWrites=true&w=majority`;
// connect to mongoose DB
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("DB connection is sucessful");
  })
  .catch((err) => console.log(err));

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  edition: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  aboutAuthor: {
    type: String,
    required: true,
  },
});
const BookModel = mongoose.model("Book", BookSchema);

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const UserModel = mongoose.model("User", UserSchema);

app.post("/register", (req, res) => {
  const user1 = new UserModel(req.body);
  user1.save().then((result) => {
    res.status(201).send(result);
  });
});
app.post("/login", (req, res) => {
  UserModel.find(req.body).then((result) => {
    if (result.length > 0) {
      const token = jwt.sign({ username: req.body.username }, secret, {
        expiresIn: "24hr",
      });
      res.send({ token });
    } else res.send("Invalid username or password");
  });
});

app.post("/", (req, res) => {
  const token = req.header("Authorization");
  try {
    jwt.verify(token, secret);
    const book1 = new BookModel(req.body);
    book1.save().then((result) => {
      res.status(201).send(result);
    });
  } catch (err) {
    res.status(400).send("Unauthorized user.");
  }
});

app.get("/", (req, res) => {
  const token = req.header("Authorization");
  try {
    jwt.verify(token, secret);
    BookModel.find({}).then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(400).send("Unauthorized user.");
  }
});

app.get("/:title", (req, res) => {
  const token = req.header("Authorization");
  try {
    jwt.verify(token, secret);
    BookModel.find({
      title: { $regex: ".*" + req.params.title + ".*", $options: "i" },
    }).then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(400).send("Unauthorized user.");
  }
});

app.put("/:id", (req, res) => {
  const token = req.header("Authorization");
  try {
    jwt.verify(token, secret);
    BookModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    }).then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(400).send("Unauthorized user.");
  }
});

app.delete("/:id", (req, res) => {
  const token = req.header("Authorization");
  try {
    jwt.verify(token, secret);
    BookModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(400).send("Unauthorized user.");
  }
});

app.listen(5000, () => {
  console.log("Server is listning @ 5000");
});
