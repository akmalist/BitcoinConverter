//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  // console.log(request.body.crypto);
  // This is how we get the user information from the page
  // this is how we secify what inofo we want using the name of the value in html

  var crypto = req.body.crypto; // request from html with Crypto name
  var fiat = req.body.fiat; //request from html with fiat name
  var amount = req.body.amount; // request amount from htmn body to our server


  // console.log(crypto); //**** prints out whole word
  // console.log(fiat); //*** prints out whole word and space

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }

  };

  request(options, function(error, response, body) {
    var data = JSON.parse(body); // parisng the JSON info and making it a JS object Lec216
    var price = data.price;
    // console.log(price);

    var currentDate = data.time;
    res.write("<p>The current Date is " + currentDate + "</p>");
    res.write("<h1> " + amount + crypto + " is currently worth " + price + fiat + "</h1>");
    res.send();

  });

});



app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
