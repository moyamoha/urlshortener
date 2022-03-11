import fetch from "node-fetch";

async function getRandomWord(req, res, next) {
	try {
		const response = await fetch(
			"https://random-word-api.herokuapp.com/word?number=1&swear=0 "
		);
		const data = response.json();
		res.random = data[0];
		next();
	} catch (err) {
		console.log(err);
	}
}

export default getRandomWord;
