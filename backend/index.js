const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = Express();
app.use(Express.json());
app.use(cors());
const port = 5038;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  next();
});

const connectString =
  "mongodb+srv://tartejbros:trialpassword@cluster0.hhsnjqy.mongodb.net/";

const contestSchema = new mongoose.Schema({
  contestId: {
    type: String,
    required: true,
    unique: true,
  },
  contestName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return !isNaN(Date.parse(v)); // Ensures it's a valid date
      },
      message: (props) => `${props.value} is not a valid ISO 8601 date!`,
    },
  },
  contestStatus: {
    type: String,
    required: true,
    enum: ["active", "ended"], // Only allows these values
  },
});

const Contest = mongoose.model("Contest", contestSchema);

app.get("/api/contest", async (req, res) => {
  try {
    const result = await Contest.find();
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/contest", async (req, res) => {
  try {
    const newContest = new Contest({
      contestId: req.body.contestId,
      contestName: req.body.contestName,
      createdDate: new Date(req.body.createdDate),
      contestStatus: req.body.contestStatus,
    });

    await newContest.save();
    res.status(200).json({ message: "Contest added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const start = async () => {
  try {
    await mongoose.connect(connectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");

    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
start();
