const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding!"
    },
    {
        id: uuidv4(),
        username: "Shreyansh Verma",
        content: "Hard work beats talent"
    },
    {
        id: uuidv4(),
        username: "Pushpita",
        content: "I got selected for my 1st internship!"
    }
]

app.get("/posts", (req, res) =>
{
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => 
{
    res.render("new.ejs");
})

app.get("/posts/:id", (req, res) =>
{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

app.post("/posts", (req, res) =>
{
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts"); //sends a get request to /posts
})

app.patch("/posts/:id", (req, res) => 
{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) =>
{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req, res) =>
{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.get("/login", (req, res) =>
{
    res.render("login.ejs");
})

app.post("/login", (req, res) =>
{
    let { username, password } = req.body;
    if(username == "abc" && password == "123")
    {
        res.redirect("/posts");
    }
    else
    {
        res.render("error.ejs");
    }
})

app.listen(port, () =>
{
    console.log(`listening to port ${port}`);
})