import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Url from "./models/url.js";
import getRandomWord from "./middlewares/randomWord.js";
import { checkBody, isTooShort } from "./middlewares/errorHandler.js";

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

app.post("/url", checkBody, isTooShort, getRandomWord, async (req, res) => {
	const randomWord = res.word;
	const newUrlRecord = new Url({
		original: req.body.url,
		identifier: randomWord,
	});
	try {
		const savedUrl = await newUrlRecord.save();
		res.status(201).json({
			shortened: `https://lyhenna.herokuapp.com/short/${savedUrl.identifier}/`,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/short/*", async (req, res) => {
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
