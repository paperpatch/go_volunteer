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

  const joinEvent = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (!itemInCart) {
      dispatch({
        type: ADD_TO_CART,
        event: { ...currentEvent, attendingEvent: true },
      });
      idbPromise('cart', 'put', { ...currentEvent, attendingEvent: true });
      console.log('added event to your list')
    }
  };

  const removeEvent = () => {
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
          <div>Host: {currentEvent.host}</div>
          <img
            src={`/images/${currentEvent.image}`}
            alt={currentEvent.title}
          />
          <div>
            <div>{currentEvent.description}</div>
            <br/>
            
            <div>Location: {currentEvent.location}</div>
            <div>Date: {currentEvent.date}</div>
            <div>Start Time: {currentEvent.startTime}</div>
            <div>End Time: {currentEvent.endTime}</div>
            <div>Website: {currentEvent.url}</div>
          </div>

          <p>
            <button onClick={joinEvent}>Add Event</button>
            <button
              disabled={!cart.find((p) => p._id === currentEvent._id)}
              onClick={removeEvent}
            >
              Remove from your list.
            </button>
          </p>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
