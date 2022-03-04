import React from "react";
import EventList from "../components/EventList";
import CategoryMenu from "../components/CategoryMenu";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <EventList />
      <Sidebar />
    </div>
  );
};

export default Home;
