import React from "react";
import EventList from "../components/EventList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <EventList />
      <Cart />
    </div>
  );
};

export default Home;
