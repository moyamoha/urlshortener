import axios from "axios";

async function getRandomWord(req, res, next) {
	try {
		const response = await axios.get(
			"https://random-word-api.herokuapp.com/word?number=1"
		);
		res.word = response.data[0];
		next();
	} catch (err) {
		console.log(err);
	}
}

export default getRandomWord;
