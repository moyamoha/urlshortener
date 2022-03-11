import express from "express";
import generateRandomStr from "../utils/generateRandomStr.js";
import Url from "../models/urls.js";

const urlRouter = express.Router();

urlRouter.post("/", async (req, res) => {
	if (!req.body || !req.body.url) {
		res.status(400).json({ error: "Should provide a url" });
		return;
	}
	const randomWord = generateRandomStr();

	const newUrlRecord = new Url({
		original: req.body.url,
		identifier: randomWord,
	});
	try {
		const savedUrl = await newUrlRecord.save();
		res.status(201).json({
			shortened: `https://lyhenna.herokuapp.com/url/short/${savedUrl.identifier}/`,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

urlRouter.get("/short/*", async (req, res) => {
	console.log(req.url.split("/")[2]);
	try {
		const foundRoute = await Url.findOne({ identifier: req.url.split("/")[2] });
		res.redirect(foundRoute.original);
	} catch (err) {
		console.log(err.message);
	}
});

export default urlRouter;
