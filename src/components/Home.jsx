import "./home.css";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Pagination } from "./Pagination";
export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(20);
  const [currtype, setType] = useState("whites");
  if (localStorage.getItem("saved-wine-Pro") == null) {
    localStorage.setItem("saved-wine-Pro", JSON.stringify([]));
  }
  const addtocart = (product) => {
    if (localStorage.getItem("winePro") === null) {
      localStorage.setItem("winePro", JSON.stringify([]));
    }
    let array = JSON.parse(localStorage.getItem("winePro"));
    let present = false;
    array.forEach((pro) => {
      if (pro.wine == product.wine) {
        pro["quantity"]++;
        present = true;
      }
    });
    if (present) {
      localStorage.setItem("winePro", JSON.stringify(array));
    } else {
      product["quantity"] = 1;
      array.push(product);
      localStorage.setItem("winePro", JSON.stringify(array));
    }
    alert("product is added to your cart!");
  };

  const fetchData = async (url, filter) => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();

    if (filter == "hTol") {
      data.sort(function (a, b) {
        var keyA = a.rating.average,
          keyB = b.rating.average;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
      setPosts(data);
      setLoading(false);
    } else if (filter == "lToh") {
      data.sort(function (a, b) {
        var keyA = a.rating.average,
          keyB = b.rating.average;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      setPosts(data);
      setLoading(false);
    } else if (filter == "lTohR") {
      data.sort(function (a, b) {
        var keyA = +a.rating.reviews.trim().split(" ")[0],
          keyB = +b.rating.reviews.trim().split(" ")[0];
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      setPosts(data);
      setLoading(false);
    } else if (filter == "hTolR") {
      console.log("dasd");
      data.map((ele) => {
        console.log(ele.rating.reviews.trim().split(" "));
      });
      data.sort(function (a, b) {
        var keyA = +a.rating.reviews.trim().split(" ")[0],
          keyB = +b.rating.reviews.trim().split(" ")[0];
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
      setPosts(data);
      setLoading(false);
    } else {
      setPosts(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData("https://api.sampleapis.com/wines/whites");
  }, []);
  const filterByReview = (e) => {
    fetchData(`https://api.sampleapis.com/wines/${currtype}`, e.target.value);
  };
  const filterByRating = (e) => {
    switch (e.target.value) {
      case "hTol":
        fetchData(`https://api.sampleapis.com/wines/${currtype}`, "hTol");
        break;
      case "lToh":
        fetchData(`https://api.sampleapis.com/wines/${currtype}`, "lToh");
        break;
      case "":
        fetchData(`https://api.sampleapis.com/wines/${currtype}`, "");
      default:
        break;
    }
  };
  const filterByType = (e) => {
    if (e.target.value != "") {
      setType(e.target.value);
    }
    fetchData(`https://api.sampleapis.com/wines/${e.target.value}`, "");
  };
  const paginate = (n) => {
    setCurrentPage(n);
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);
  return (
    <>
      <select name="" id="" onChange={filterByType} className="input_bar">
        <option value="">Choose By Categories</option>
        <option value="reds">Reds</option>
        <option value="whites">Whites</option>
        <option value="port">Port</option>
        <option value="sparkling">Sparkling</option>
        <option value="dessert">Dessert</option>
      </select>
      &nbsp; &nbsp;
      <select name="" id="" onChange={filterByRating} className="input_bar">
        <option value="">Filter By Ratings</option>
        <option value="hTol">High To Low</option>
        <option value="lToh">Low To High</option>
      </select>
      &nbsp; &nbsp;
      <select name="" id="" onChange={filterByReview} className="input_bar">
        <option value="">Filter By Reviews</option>
        <option value="hTolR">High To Low</option>
        <option value="lTohR">Low To High</option>
      </select>
      <div className="pro-Container">
        {currentPosts.map((ele) => (
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
              <div key={nanoid()} onClick={() => addtocart(ele)} id="addToCart">
                Add to cart
              </div>
            </div>
          </>
        ))}
      </div>
      <Pagination
        postPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
};
