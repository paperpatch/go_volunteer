import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function EventItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    _id,
    image,
    title,
    location,
    date,
    startTime,
    endTime,
    url,
  } = item;

  const { cart } = state

  const joinEvent = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    console.log('working');
    if (itemInCart) {
      dispatch({
        type: ADD_TO_CART,
        event: { ...item, attendingEvent: 1 }
      });
      idbPromise('cart', 'put', { ...item, attendingEvent: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/event/${_id}`}>
        <img
          alt={title}
          src={`/images/${image}`}
        />
        <p>{title}</p>
      </Link>
      <div>
        <div>Location: {location}</div>
        <div>Date: {date}</div>
        <div>Start Time: {startTime}</div>
        <div>End Time: {endTime}</div>
        <div>Website: {url}</div>
      </div>
      <button onClick={joinEvent}>Add Event</button>
    </div>
  );
}

export default EventItem;
