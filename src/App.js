import Joke from "./components/Joke";
import Todos from "./components/Todos";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Joke />
      <br />
      <Todos />
    </div>
  );
}
