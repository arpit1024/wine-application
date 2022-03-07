import "./home.css";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Link, Navigate, useNavigate } from "react-router-dom";
export const Cart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  if (localStorage.getItem("saved-wine-Pro") == null) {
    localStorage.setItem("saved-wine-Pro", JSON.stringify([]));
  }
  useEffect(() => {
    let prod = JSON.parse(localStorage.getItem("winePro")) || [];
    if (JSON.parse(localStorage.getItem("saved-wine-Pro")).length) {
      let saved = JSON.parse(localStorage.getItem("saved-wine-Pro"));
      prod.push(...saved);
      console.log("thsud", prod);
      setProducts(prod);
    }
    if (prod && products.length == 0) {
      setProducts(prod);
      localStorage.setItem("winePro", JSON.stringify([]));
    }
  }, []);
  const change = (val, name) => {
    let arr = products;
    arr.map((pro) => {
      if (pro.wine == name) {
        pro.quantity += val;
      }
    });
    arr = arr.filter((val) => {
      if (val.quantity > 0) {
        return val;
      }
    });
    setProducts(arr);
    localStorage.setItem("winePro", JSON.stringify(arr));
  };
  const delt = (name) => {
    let arr = products;
    arr = arr.filter((pro) => {
      if (pro.wine != name) {
        return pro;
      }
    });
    setProducts(arr);
    localStorage.setItem("winePro", JSON.stringify(arr));
  };

  const saveProds = () => {
    localStorage.setItem("saved-wine-Pro", JSON.stringify(products));
    alert(
      "Products is being saved to your cart you can do shopping later now!"
    );
  };
  const checkout = () => {
    if (JSON.parse(localStorage.getItem("saved-wine-Pro")).length == 0) {
      alert("please save the products Or Cart is Empty!");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <>
      <div className="btns">
        <button onClick={checkout}>Check Out</button> &nbsp;
        <button onClick={saveProds}>
          Save Products(OR EMPTY) for Later Checkout
        </button>
      </div>
      <div className="pro-Container">
        {products.length == 0 ? (
          <h1>Cart is Empty</h1>
        ) : (
          products.map((ele) => (
            <>
              <div key={nanoid()} className="products">
                <img src={ele.image} alt="Image Not Available" srcset="" />
                <div key={nanoid()}>{ele.winery}</div>
                <div key={nanoid()} className="ratings">
                  <div>Reviews {ele.rating.reviews}</div>
                  <div>Average Rating {ele.rating.average}</div>
                </div>
                <div key={nanoid()}>{ele.wine}</div>
                <div key={nanoid()}>Location: {ele.location}</div>
                <div key={nanoid()} className="quantityPro">
                  Quantity: {ele.quantity}
                </div>
                <div>
                  {" "}
                  <div
                    onClick={() => change(1, ele.wine)}
                    className="quantityPro plusMin"
                  >
                    +
                  </div>{" "}
                  <div
                    onClick={() => change(-1, ele.wine)}
                    className="quantityPro plusMin"
                  >
                    -
                  </div>
                  <div
                    onClick={() => delt(ele.wine)}
                    className="quantityPro Del"
                  >
                    Delete Item
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};
