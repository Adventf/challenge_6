const express = require("express");
const router = express.Router();
const app = express();
const port = 3001;
const { User } = require("./models");
const { Biodata } = require("./models");
const { Skor } = require("./models");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/biodata", (req, res) => {
  res.render("biodata");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/play", (req, res) => {
  res.render("play");
});

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.post("/login", (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
  }).then((a) => res.status(200).redirect("/play"));
});

app.post("/biodata", (req, res) => {
  Biodata.create({
    email: req.body.email,
    city: req.body.city,
    country: req.body.country,
    username: req.body.username,
    sex: req.body.sex,
  }).then((a) => {
    res.send("Your input has been successfully saved");
  });
});

app.get("/data", (req, res) => {
  User.findAll().then((a) => res.render("data", { a }));
});
app.get("/data/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  }).then((a) => {
    res.render("show", { a });
  });
});

app.get("/bio", (req, res) => {
  Biodata.findAll().then((a) => {
    res.status(200).json(a);
  });
});
app.get("/bio/:id", (req, res) => {
  Biodata.findOne({
    where: { id: req.params.id },
  }).then((a) => {
    res.status(200).json(a);
  });
});

app.get("/skor", (req, res) => {
  Skor.findAll().then((a) => {
    res.status(200).json(a);
  });
});
app.get("/skor/:id", (req, res) => {
  Skor.findOne({
    where: { id: req.params.id },
  }).then((a) => {
    res.status(200).json(a);
  });
});

app.put("/login/:id", (req, res) => {
  User.update(
    {
      email: req.body.email,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  )
    .then((article) => {
      res.status(201).json(article);
    })
    .catch((err) => {
      res.status(422).json("You can't update the data");
    });
});

app.put("/biodata/:id", (req, res) => {
  Biodata.update(
    {
      email: req.body.email,
      city: req.body.city,
      country: req.body.country,
      username: req.body.username,
      sex: req.body.sex,
    },
    { where: { id: req.params.id } }
  )
    .then((article) => {
      res.status(201).json(article);
    })
    .catch((err) => {
      res.status(422).json("You can't update the data");
    });
});

app.put("/skor/:id", (req, res) => {
  Skor.update(
    {
      username: req.body.username,
      skor: req.body.skor,
    },
    { where: { id: req.params.id } }
  )
    .then((article) => {
      res.status(201).json(article);
    })
    .catch((err) => {
      res.status(422).json("You can't update the data");
    });
});

app.delete("/login/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then((a) => {
    res.status(200).json(a);
  });
});

app.delete("/biodata/:id", (req, res) => {
  Biodata.destroy({ where: { id: req.params.id } }).then((a) => {
    res.status(200).json(a);
  });
});

app.delete("/skor/:id", (req, res) => {
  Skor.destroy({ where: { id: req.params.id } }).then((a) => {
    res.status(200).json(a);
  });
});

app.get("/iniError", (req, res) => {
  iniError;
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: "fail",
    errors: err.message,
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    errors: "Are you lost?",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
