// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  let inputDate;
  let parsedDate;
  if (req.params.date) inputDate = req.params.date;
  else inputDate = new Date();

  const isUnix = Number(inputDate);

  if (isNaN(isUnix)) parsedDate = new Date(inputDate);
  else parsedDate = new Date(isUnix);

  if (isNaN(parsedDate.getTime())) return res.json({ error: "Invalid Date" });
  console.log({ parsedDate });
  const utc = parsedDate.toUTCString(); // Get the UTC date and time
  const unix = parsedDate.getTime();

  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
  // console.log("Your app is listening on port " + 3000);
});
