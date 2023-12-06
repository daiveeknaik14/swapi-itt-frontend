import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import moment from "moment";
import { GetUser } from "../../../apicalls/users";
import { useNavigate } from "react-router-dom"; // Assuming you have an API call function like this

function UserDetails() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await GetUser(id);
      if (response.success) {
        setUser(response.data);
      } else {
        message.error("Failed to fetch user details");
      }
    } catch (error) {
      message.error(
        error.message || "An error occurred while fetching user details"
      );
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="flex flex-col h-screen justify-start items-center pt-20">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 mt-4">
        <h1 className="text-2xl font-semibold text-center mb-4">
          {user.name}'s Profile
        </h1>

        <div className="border-b border-gray-200 mb-4"></div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Name:</span>
            <span className="text-lg">{user.name}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Email:</span>
            <span className="text-lg">{user.email}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Create Account Date:</span>
            <span className="text-lg">
              {moment(user.createdAt).format("MMM D, YYYY hh:mm A")}
            </span>
          </div>
        </div>
      </div>

      <span
        className="text-sm underline text-blue-500 cursor-pointer hover:text-blue-700 mt-4"
        onClick={() => navigate("/")}
      >
        Back to Home
      </span>
    </div>
  );
}

export default UserDetails;
