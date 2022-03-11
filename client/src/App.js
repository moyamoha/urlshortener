import UrlForm from "./components/UrlForm";

function App() {
	return (
		<div className="App">
			<div className="container d-flex flex-column">
				<h1 className="mt-4 mb-3">Welcome to url Shortener</h1>
				<UrlForm></UrlForm>
			</div>
		</div>
	);
}

export default App;
