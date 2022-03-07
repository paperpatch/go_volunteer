import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  ADD_TO_CART,
  UPDATE_EVENTS,
} from '../utils/actions';
import { QUERY_EVENTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentEvent, setcurrentEvent] = useState({});

  const { loading, data } = useQuery(QUERY_EVENTS);

  const { events, cart } = state;

  console.log('events', events)

  useEffect(() => {
    // already in global store
    if (events.length) {
      setcurrentEvent(events.find((event) => event._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_EVENTS,
        events: data.events,
      });

      data.events.forEach((event) => {
        idbPromise('events', 'put', event);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('events', 'get').then((indexedEvents) => {
        dispatch({
          type: UPDATE_EVENTS,
          events: indexedEvents,
        });
      });
    }
  }, [events, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentEvent, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentEvent, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentEvent._id,
    });

    idbPromise('cart', 'delete', { ...currentEvent });
  };

  return (
    <>
      {currentEvent && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Events</Link>

          <h2>{currentEvent.title}</h2>

          <p>{currentEvent.description}</p>

          <p>
            <button onClick={addToCart}>Add Event</button>
            <button
              disabled={!cart.find((p) => p._id === currentEvent._id)}
              onClick={removeFromCart}
            >
              Remove from your Events
            </button>
          </p>

          <img
            src={`/images/${currentEvent.image}`}
            alt={currentEvent.title}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
