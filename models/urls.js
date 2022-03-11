import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
	original: {
		type: String,
		required: true,
		unique: true,
	},
	identifier: {
		type: String,
		required: true,
	},
});

export default mongoose.model("url", urlSchema);
