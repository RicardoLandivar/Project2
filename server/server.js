require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());


//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));


// get all cards
app.get("/api/v1/cards", async (req, res) => {

  try {
    const results = await db.query("select * from cards")
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        cards: results.rows,
      },

    });
  } catch (err) {
    console.log(err);
  }
});


// get a card
app.get("/api/v1/cards/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("select * from cards where id = $1", [req.params.id]);
    res.status(200).json({
      status: "success",
      data: {
        card: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }

});

// add new card

app.post("/api/v1/cards", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query("INSERT INTO cards (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        card: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }

});


// update cards

app.put("/api/v1/cards/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      card: "Ragnaros"
    }
  })

});

//Delete a card

app.delete("/api/v1/cards/:id", async (req, res) => {

  try {
    const results = db.query("DELETE FROM cards where id = $1", [req.params.id])
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }

});



//http://localhost: 4000/getCards

console.log("test");

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
