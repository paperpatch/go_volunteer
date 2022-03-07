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
        <div>{item.date}</div>
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