import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoteList from "./components/NoteList";

function App() {
  return (
    <div className="app">
      <h1>Note-Keeper</h1>
      <NoteList />
      <ToastContainer />
    </div>
  );
}

export default App;
