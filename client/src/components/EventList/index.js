import React, { useEffect } from 'react';
import EventItem from '../EventItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_EVENTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function EventList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_EVENTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_EVENTS,
        events: data.events,
      });
      data.events.forEach((product) => {
        idbPromise('events', 'put', product);
      });
    } else if (!loading) {
      idbPromise('events', 'get').then((events) => {
        dispatch({
          type: UPDATE_EVENTS,
          events: events,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterEvents() {
    if (!currentCategory) {
      return state.events;
    }

    return state.events.filter(
      (event) => event.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Upcoming Events:</h2>
      {state.events.length ? (
        <div className="flex-row">
          {filterEvents().map((event) => (
            <EventItem
              key={event._id}
              _id={event._id}
              image={event.image}
              title={event.title}
              price={event.price}
              quantity={event.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>There are currently no events listed.</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default EventList;
