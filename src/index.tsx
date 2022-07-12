import ReactDOM  from "react-dom";
import GuestList from "./state/example";

const App = () => {
  return (
    <div id="root">
      <h1>Hello There</h1>
      <GuestList title={"Duh"}></GuestList>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));