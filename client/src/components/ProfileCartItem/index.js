import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.title}</div>
        <div>Host: {item.host}</div>
        <div>Date: {item.date}</div>
        <div>Location: {item.location}</div>
        <div>Description: {item.description}</div>
        <div>Start Time: {item.startTime}</div>
        <div>End Time: {item.endTime}</div>
        <div>Website: {item.url}</div>
        <div>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            <button>Remove Event from your List</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;