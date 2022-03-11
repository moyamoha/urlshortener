import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Url from "./models/url.js";
import getRandomWord from "./middlewares/randomWord.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(port, () =>
			console.log(`Server is running at: http://localhost:${port}`)
		)
	)
	.catch((error) => console.log(error));

app.post("/", getRandomWord, async (req, res) => {
	if (!req.body || !req.body.url) {
		res.status(400).json({ error: "Should provide a url" });
		return;
	}
	const randomWord = res.word;
	const newUrlRecord = new Url({
		original: req.body.url,
		identifier: randomWord,
	});
	try {
		const savedUrl = await newUrlRecord.save();
		res.status(201).json({
			shortened: `https://lyhenna.herokuapp.com/${savedUrl.identifier}/`,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/[^]{2,}", async (req, res) => {
	console.log(req.url.split("/")[1]);
	try {
		const foundRoute = await Url.findOne({ identifier: req.url.split("/")[2] });
		res.redirect(foundRoute.original);
	} catch (err) {
		console.log(err.message);
	}
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
