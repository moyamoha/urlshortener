import React, { useCallback, useState } from "react";
import axios from "axios";
import { BiCopy } from "react-icons/bi";
import { TiTick } from "react-icons/ti";

import "./form.css";

export default function UrlForm() {
	const [url, setUrl] = useState("");
	const [shortened, setShortened] = useState("");
	const [copied, setCopied] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/url/", { url: url });
			setShortened(response.data.shortened);
			setCopied(false);
		} catch (err) {
			console.log(err);
		}
	};

	const copyToClipboard = useCallback(() => {
		console.log(navigator);
		if (!navigator.clipboard || !shortened) {
			console.log("ok");
			return;
		}
		navigator.clipboard
			.writeText(shortened)
			.then(() => {
				setCopied(true);
			})
			.catch((err) => console.log(err));
	}, [shortened]);

	return (
		<form className="url-form" onSubmit={handleSubmit}>
			<div className="row">
				<div className="form-group col-12 col-md-6 align-items-end">
					<label htmlFor="original" className="mb-2">
						Original Url
					</label>
					<textarea
						style={{ resize: "none" }}
						id="original"
						className="form-control"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					></textarea>
				</div>
				<div className="form-group col-12 col-md-6">
					<label htmlFor="shortenedUrl" className="mb-2">
						Shortened url
					</label>
					<div className="wrapper">
						<textarea
							className="form-control"
							id="shortenedUrl"
							style={{ resize: "none" }}
							disabled={true}
							value={shortened}
						></textarea>
						{copied ? (
							<TiTick className="copy-icon"></TiTick>
						) : (
							<BiCopy className="copy-icon" onClick={copyToClipboard}></BiCopy>
						)}
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<button type="submit" className="btn btn-primary mt-3 w-25">
					Go for it
				</button>
			</div>
		</form>
	);
}
