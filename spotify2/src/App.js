import Login from "./Components/Login";
import Main from "./Pages/Main";
import "./reset.css";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return <div className="App">{code ? <Main code={code} /> : <Login />}</div>;
}

export default App;
