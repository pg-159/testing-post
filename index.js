const express = require("express");
const app = express();
app.use(express.json());

let authors = [
  { authorId: 1, name: "George Orwell", book: "1984" },
  { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
  { authorId: 3, name: "Ray Bradbury", book: "Fahrenheit 451" },
];

function getAuthors() {
  return authors;
}

function getAuthorById(id) {
  return authors.find((author) => author.authorId === id);
}

function addAuthor(author) {
  authors.push(author);
  return author;
}

app.get("/authors", (req, res) => {
  res.json(getAuthors());
});

app.get("/authors/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let author = getAuthorById(id);
  if (author) {
    res.json(author);
  } else {
    res.status(404).send("Author not found");
  }
});

app.post("/authors/new", (req, res) => {
  let newAuthor = req.body;
  let addedAuthor = addAuthor(newAuthor);
  res.status(201).json(addedAuthor);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
