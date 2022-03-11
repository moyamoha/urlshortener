import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import urlRouter from "./routes/url.js";

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

app.use("/url", urlRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
