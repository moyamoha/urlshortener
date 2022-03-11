import React, { useCallback, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import "./form.css";

export default function UrlForm() {
	const [url, setUrl] = useState("");
	const [shortened, setShortened] = useState("");
	const [copied, setCopied] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(url);
		fetch("/url/", {
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

	const copyToClipboard = useCallback(() => {
		if (!Navigator.clipboard || !shortened) {
			console.log("ok");
			return;
		}
		console.log(Navigator.clipboard);
		Navigator.clipboard
			.writeText(shortened)
			.then(() => {
				setCopied(true);
			})
			.then((err) => console.log(err));
	}, [shortened]);

	return (
		<form className="url-form" onSubmit={handleSubmit}>
			<div className="row">
				<div class="form-group col-12 col-md-6 align-items-end">
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
				<div class="form-group col-12 col-md-6">
					<label htmlFor="shortenedUrl" className="mb-2">
						Shortened url
					</label>
					<div className="wrapper">
						<textarea
							class="form-control"
							id="shortenedUrl"
							style={{ resize: "none" }}
							disabled={true}
							value={shortened}
						></textarea>
						{copied ? (
							<TiTick></TiTick>
						) : (
							<BiCopy className="copy-icon" onClick={copyToClipboard}></BiCopy>
						)}
					</div>
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
