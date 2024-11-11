import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const [senderInfo, setSenderInfo] = useState(null);
  const [senderUsername, setSenderUsername] = useState(""); // Store sender's username

  // Fetch messages for the conversation
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id], // Use conversation ID as part of query key
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  // Fetch sender's info (name, username, etc.) when the component mounts
  useEffect(() => {
    const fetchSenderInfo = async () => {
      try {
        const response = await newRequest.get(`/conversations/${id}`);
        setSenderInfo(response.data.otherUser);

        // Fetch the sender's username
        const senderUsernameResponse = await newRequest.get(`/users/${response.data.otherUser._id}`);
        setSenderUsername(senderUsernameResponse.data.username);
      } catch (error) {
        console.error("Error fetching sender info:", error);
      }
    };

    fetchSenderInfo();
  }, [id]);

  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => queryClient.invalidateQueries(["messages"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        {/* Header with Sender’s Name and Username */}
        {senderInfo && (
          <div className="chat-header">
            <img
              src={senderInfo.profilePicture || "/img/noavatar.jpg"}
              alt="Sender Profile"
              className="header-img"
            />
            <div className="sender-details">
              <span className="sender-name">{senderUsername || "Unknown User"}</span>
              <span className="sender-username">@{senderUsername || "unknown"}</span>
            </div>
          </div>
        )}

        {/* Messages List */}
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Error loading messages."
        ) : (
          <div className="messages">
            {data.map((msg) => (
              <div
                className={msg.userId === currentUser._id ? "owner item" : "item"}
                key={msg._id}
              >
                <img
                  src={
                    msg.userId === currentUser._id
                      ? currentUser.img || "/img/noavatar.jpg" // Current user's image
                      : msg.userProfilePicture || "/img/noavatar.jpg" // Other user's image
                  }
                  alt="Profile"
                  className="profile-img"
                />
                <p>{msg.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Message Input Form */}
        <form className="write" onSubmit={handleSubmit}>
          <textarea placeholder="Write a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
