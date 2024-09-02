import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./components/List";
import Cart from "./components/Cart";
import StoreNavBar from "./components/StoreNavBar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <StoreNavBar />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
