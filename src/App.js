import logo from "./logo.svg";
import "./App.css";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Cart } from "./components/Cart";
import { Route, Routes } from "react-router-dom";
import { CheckOut } from "./components/CheckoutPage";
import { Success } from "./components/success";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Cart />} path="/cart"></Route>
        <Route element={<CheckOut />} path="/checkout"></Route>
        <Route element={<Success />} path="/success"></Route>
      </Routes>
    </div>
  );
}

export default App;
