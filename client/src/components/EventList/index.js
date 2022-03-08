import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_EVENTS } from '../../utils/actions';

import { QUERY_EVENTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';

import spinner from '../../assets/spinner.gif';

import EventItem from '../EventItem';
import EventModal from '../EventModal';
import SuccessModal from "../SuccessModal";

function EventList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_EVENTS);

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onClose = () => setEventModalOpen(false);
  const showSuccessMod = () => setShowSuccess(true);
  

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_EVENTS,
        events: data.events,
      });
      data.events.forEach((event) => {
        idbPromise('events', 'put', event);
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

  const CreateEventButton = () => {
    return (
      <div className="relative h-16 mt-6 mb-4 text-center ">
        <button
          title="Create An Event"
          onClick={() => {
            setEventModalOpen(true);
          }}
          className="h-16 px-8 py-2 m-auto text-lg font-bold text-black bg-orange-200 rounded font-primary hover:bg-orange-300"
        >
          Create An Event
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {eventModalOpen && (
          <EventModal onClose={onClose} showSuccessMod={showSuccessMod} />
        )}
        {showSuccess && (
              <SuccessModal
                message={"Event Successfully Added!"}
                closeSuccess={() => setShowSuccess(false)}
              />
            )}
        {Auth.loggedIn() && <CreateEventButton />}
      </div>

      <div className="my-2">
        <h2>Upcoming Events:</h2>
        {state.events.length ? (
          <div className="flex-row">
            {filterEvents().map((event) => (
              <EventItem
                key={event._id}
                _id={event._id}
                host={event.host}
                image={event.image}
                title={event.title}
                location={event.location}
                date={event.date}
                startTime={event.startTime}
                endTime={event.endTime}
                url={event.url}
              />
            ))}
          </div>
        ) : (
          <h3>There are currently no events listed.</h3>
        )}
        {loading ? <img src={spinner} alt="loading" /> : null}
      </div>
    </>
  );
}

export default EventList;
