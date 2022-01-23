const { Skor } = require("./models");

Skor.create({
  username: "niki",
  skor: 12,
}).then((article) => console.log(article));
