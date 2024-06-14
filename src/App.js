import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoteList from "./components/NoteList";

function App() {
  return (
    <div className="app">
      <NoteList />
      <ToastContainer />
    </div>
  );
}

export default App;
