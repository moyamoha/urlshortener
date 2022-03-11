import React, { useState } from "react";

export default function UrlForm() {
	const [url, setUrl] = useState("");
	const [shortened, setShortened] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(url);
		fetch("http://localhost:4000/url/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url: url }),
		})
			.then((res) => res.json())
			.then((data) => {
				setShortened(data.shortened);
			})
			.catch((err) => console.error(err));
	};

	return (
		<form className="url-form" onSubmit={handleSubmit}>
			<div className="row">
				<div class="form-group col-12 col-md-6 align-items-end">
					<label htmlFor="original" className="mb-2">
						Original Url
					</label>
					<textarea
						style={{ resize: "vertical" }}
						id="original"
						className="form-control"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					></textarea>
				</div>
				<div class="form-group col-12 col-md-6">
					<label htmlFor="shortenedUrl" className="mb-2">
						Shortened url
					</label>
					<textarea
						class="form-control"
						id="shortenedUrl"
						style={{ resize: "vertical" }}
						disabled={true}
						value={shortened}
					></textarea>
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<button type="submit" class="btn btn-primary mt-3 w-25">
					Go for it
				</button>
			</div>
		</form>
	);
}
