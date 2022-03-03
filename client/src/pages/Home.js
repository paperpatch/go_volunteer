import React from "react";
import EventList from "../components/EventList";
import CategoryMenu from "../components/CategoryMenu";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="container">
      <Sidebar />
      <CategoryMenu />
      <EventList />
    </div>
  );
};

export default Home;
