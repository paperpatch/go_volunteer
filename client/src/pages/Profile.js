import React from 'react';
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import ProfileCart from "../components/ProfileCart";

export default function Profile() {
  const { data } = useQuery(QUERY_ME);

  const myData = data?.me || {};
  console.log('myData', myData);

  const ProfilePicture = () => {
    return (
      <img
        className="antialiased rounded-lg shadow-lg"
        src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png"
        width="192px"
        height="192px"
        alt="User"
      />
    );
  };

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Home</Link>
          
        <h2>
          Profile Page<br/>
          <ProfilePicture />
        </h2>

        <div>First Name: {myData.firstName}</div>
        <div>Last Name: {myData.lastName}</div>
        <div>Email: {myData.email}</div>

        <h3>My Listed Events:</h3>
        <ProfileCart />

      </div>
    </>
  );
}