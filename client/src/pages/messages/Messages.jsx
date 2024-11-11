import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeRow, setActiveRow] = useState(null); // Track the active row
  const [usernames, setUsernames] = useState({}); // Store usernames for each conversation

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  // Fetch usernames for each conversation user
  useEffect(() => {
    if (data) {
      const fetchUsernames = async () => {
        const usernamesMap = {};
        for (const convo of data) {
          const userId = currentUser.isSeller ? convo.buyerId : convo.sellerId;
          if (!usernamesMap[userId]) {
            try {
              const response = await newRequest.get(`/users/${userId}`);
              usernamesMap[userId] = response.data.username;
            } catch (err) {
              console.error("Error fetching username:", err);
            }
          }
        }
        setUsernames(usernamesMap);
      };

      fetchUsernames();
    }
  }, [data, currentUser.isSeller]);

  const handleRowClick = (id) => {
    setActiveRow(id);
    navigate(`/message/${id}`);
  };

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "An error occurred. Please try again."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          {data && data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                  <th>Last Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => (
                  <tr
                    key={c.id}
                    className={`${
                      ((currentUser.isSeller && !c.readBySeller) ||
                        (!currentUser.isSeller && !c.readByBuyer)) &&
                      "active"
                    } ${activeRow === c.id ? "highlight" : ""}`} // Add highlight class for the active row
                    onClick={() => handleRowClick(c.id)}
                  >
                    <td>
                      {usernames[currentUser.isSeller ? c.buyerId : c.sellerId] || "Loading..."}
                    </td>
                    <td>
                      {c?.lastMessage?.substring(0, 100)}...
                    </td>
                    <td>{moment(c.updatedAt).fromNow()}</td>
                    <td>
                      {((currentUser.isSeller && !c.readBySeller) ||
                        (!currentUser.isSeller && !c.readByBuyer)) && (
                        <button onClick={(e) => {
                          e.stopPropagation();
                          handleRead(c.id);
                        }}>
                          Mark as Read
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-messages">
              <h2>No conversations yet</h2>
              <p>It looks like you haven't started any conversations yet.</p>
              <Link to="/gigs" className="start-convo-btn">
                Start a Conversation
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
