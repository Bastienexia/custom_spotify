import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Main from "./Pages/Main";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return <div className="App">{code ? <Main code={code} /> : <Login />}</div>;
}

export default App;
