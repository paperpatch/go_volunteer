import React, { useEffect } from 'react';
import { idbPromise } from '../../utils/helpers';
import ProfileCartItem from '../ProfileCartItem';
// import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';

const ProfileCart = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('events', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, events: [...cart] });
      console.log(cart);
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  return (
    <div>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <ProfileCartItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <h3>
          There's no scheduled events in your list.
          Add an event!
        </h3>
      )}
    </div>
  );
};

export default ProfileCart;
