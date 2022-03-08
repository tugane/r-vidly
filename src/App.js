import "./App.css";
import { BrowserRouter } from "react-router-dom";
import WebRoutes from "./routes/web";
import Navbar from "./components/Layouts/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <WebRoutes />
    </BrowserRouter>
  );
}

export default App;
