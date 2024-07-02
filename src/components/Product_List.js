import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import "./Product_List.css";
import { FaFilter } from "react-icons/fa";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

const DataContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
`;

const DataBox = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 3px 2px 4px rgba(0.1, 0.1, 0.1, 0.1);
  text-align: left;
  margin: 0;
  padding: 20px;
  display: inline-block;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: brown;
  color: #fff;
  border: none;
  padding: 10px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 10px;
  margin-top: 20px;
  width: 90px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const TotalCount = styled.li`
  margin-left: 10px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 3px;
  margin: auto;
  padding: auto;
`;

const SortContainer = styled.div`
  margin-bottom: 20px;
  padding-left: 20px;
`;

const SortSelect = styled.select`
  padding: 10px;
  margin-left: 10px;
  width: 300px;
  font-weight: bold;
  font-size: 15px;
  color: brown;
  border: 1px solid black;
  border-radius: 8px;
`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortOrder, setSortOrder] = useState("latest");
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://products-images.onrender.com/api/users/products"
        );
        console.log("Fetched products:", response.data);

        console.log(
          "Product dates:",
          response.data.map((p) => ({ name: p.ProductName, date: p.createdAt }))
        );
        setProducts(response.data);
        setTotalProducts(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const sortProducts = (productsToSort) => {
    switch (sortOrder) {
      case "latest":
        return [...productsToSort].sort((a, b) => {
          const dateA = a.createdAt
            ? new Date(a.createdAt)
            : new Date(parseInt(a._id.substring(0, 8), 16) * 1000);
          const dateB = b.createdAt
            ? new Date(b.createdAt)
            : new Date(parseInt(b._id.substring(0, 8), 16) * 1000);
          return dateB - dateA;
        });
      case "oldest":
        return [...productsToSort].sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return isNaN(dateA) || isNaN(dateB) ? 0 : dateA - dateB;
        });
      case "aToZ":
        return [...productsToSort].sort((a, b) =>
          a.ProductName.localeCompare(b.ProductName)
        );
      default:
        return productsToSort;
    }
  };

  const sortedProducts = sortProducts(products);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  return (
    <div id="cont">
      <h2>Product List</h2>
      <SortContainer>
        <label htmlFor="sort">
          <FaFilter />
          Sort by:
        </label>
        <li>
          <SortSelect id="sort" value={sortOrder} onChange={handleSortChange}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="aToZ">A to Z</option>
          </SortSelect>
        </li>
        <label id="lbl">
          Total Products:
          <TotalCount>{totalProducts}</TotalCount>
        </label>
      </SortContainer>
      <DataContainer>
        {currentProducts.map((product) => (
          <DataBox key={product._id}>
            <ProductImage src={product.image.url} alt={product.ProductName} />
            <p>
              <b>Product Name:&nbsp;&nbsp;</b>
              {product.ProductName}
            </p>
            <p>
              <b>Description:&nbsp;&nbsp;</b>
              {product.Description}
            </p>
            <p>
              <b>Unit:&nbsp;&nbsp;</b>
              {product.Unit}
            </p>
            <p>
              <b>Price:&nbsp;&nbsp;</b> {product.Price}
            </p>
            <p>
              <b>Category:&nbsp;&nbsp;</b> {product.Category}
            </p>
          </DataBox>
        ))}
      </DataContainer>
      <PaginationContainer>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <GrCaretPrevious size={20} />
        </PaginationButton>
        <span>
          Page {currentPage}/{totalPages}
        </span>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <GrCaretNext size={20} />
        </PaginationButton>
      </PaginationContainer>
    </div>
  );
}

export default ProductList;
