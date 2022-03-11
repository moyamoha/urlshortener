const generateRandomStr = () => {
	const randomNumOfChars = Math.floor(Math.random() * (10 - 5 + 1) + 5);
	return Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, "")
		.substring(0, randomNumOfChars);
};

export default generateRandomStr;
