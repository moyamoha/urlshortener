export function isTooShort(req, res, next) {
	if (req.body.url.length < 40) {
		res.status(400).json({ error: "Url is too short to be shortened" });
		return;
	}
	next();
}

export function checkBody(req, res, next) {
	if (!req.body || !req.body.url) {
		res.status(400).json({ error: "Please provide a url" });
		return;
	}
	next();
}
