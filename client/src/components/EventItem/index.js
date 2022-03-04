import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_SIDEBAR } from "../../utils/actions";
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
    if (itemInCart) {
      idbPromise('cart', 'put', {
        ...itemInCart,
        eventQuantity: parseInt(itemInCart.eventQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_SIDEBAR,
        product: { ...item, eventQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, eventQuantity: 1 });
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
        <div>startTime: {startTime}</div>
        <div>endTime: {endTime}</div>
        <div>url: {url}</div>
      </div>
      <button onClick={joinEvent}>Add event to your list</button>
    </div>
  );
}

export default EventItem;
