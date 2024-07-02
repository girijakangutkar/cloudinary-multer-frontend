import React from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/Product_List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/Add" element={<ProductForm />} />
          {/* <Route
            path="/"
            element={<h1>Welcome to the Product Management System</h1>}
          /> */}
        </Routes>
      </BrowserRouter>
      {/* <ProductList /> */}
    </div>
  );
}

export default App;
