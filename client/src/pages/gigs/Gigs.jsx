import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", sort, search],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => res.data),
    refetchOnWindowFocus: false, // To prevent refetching when window is focused
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort, search]);

  const applyFilters = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <div className="breadcrumbs">
          <span>Home &gt; Gigs</span>
        </div>
        <h1>Find the Best Tutors for You</h1>
        <p>Your perfect tutor is just one click away.</p>
        
        <div className="menu">
          {/* Filter Section */}
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="Min" />
            <input ref={maxRef} type="number" placeholder="Max" />
            <button onClick={applyFilters}>Apply</button>
          </div>

          {/* Sorting Section */}
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Popular" : "Newest"}
            </span>
            <img
              src="./img/down.png"
              alt="Toggle Sort"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                <span onClick={() => reSort("createdAt")}>Newest</span>
                <span onClick={() => reSort("sales")}>Best Selling</span>
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        {/* Gigs Cards */}
        <div className="cards">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">Something went wrong. Please try again later.</div>
          ) : (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
