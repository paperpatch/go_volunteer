import React from 'react';
// import { idbPromise } from '../../utils/helpers';
import EventItem from '../EventItem';
// import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_SIDEBAR } from '../../utils/actions';
import './style.css';

const Sidebar = () => {
  const [state, dispatch] = useStoreContext();

  function toggleSidebar() {
    dispatch({ type: TOGGLE_SIDEBAR });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleSidebar}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleSidebar}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <EventItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your profile yet!
        </h3>
      )}
    </div>
  );
};

export default Sidebar;
