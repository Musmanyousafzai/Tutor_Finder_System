import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [gigToDelete, setGigToDelete] = useState(null);
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      setShowConfirmDelete(false); // Close confirmation dialog after deletion
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const handleDeleteConfirmation = (id) => {
    setGigToDelete(id);
    setShowConfirmDelete(true);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setGigToDelete(null);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching gigs</p>
      ) : (
        <div className="container">
          <div className="title">
            <h1>My Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button className="addGigButton">Add New Gig</button>
              </Link>
            )}
          </div>
          {data.length === 0 ? (
            <div className="noGigsMessage">
              <p>You have no gigs yet. Create one now!</p>
              <Link to="/add">
                <button className="createGigButton">Create New Gig</button>
              </Link>
            </div>
          ) : (
            <div className="gigsList">
              {data.map((gig) => (
                <div key={gig._id} className="gigCard">
                  <img className="gigImage" src={gig.cover} alt={gig.title} />
                  <div className="gigDetails">
                    <h3 className="gigTitle">{gig.title}</h3>
                    <p className="gigPrice">${gig.price}</p>
                    <p className="gigSales">{gig.sales} Sales</p>
                  </div>
                  <div className="actionButtons">
                    <Link to={`/edit/${gig._id}`} className="editIcon">
                      ✏️ Edit
                    </Link>
                    <img
                      className="deleteIcon"
                      src="./img/delete.png"
                      alt="Delete"
                      onClick={() => handleDeleteConfirmation(gig._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="deleteConfirmation">
          <div className="confirmationBox">
            <p>Are you sure you want to delete this gig?</p>
            <div className="confirmationActions">
              <button onClick={() => handleDelete(gigToDelete)} className="confirmDelete">
                Yes, Delete
              </button>
              <button onClick={cancelDelete} className="cancelDelete">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
