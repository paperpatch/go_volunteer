import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

function Profile() {
  const { data } = useQuery(QUERY_ME);

  const myData = data?.me || {};
  const myEvents = myData?.events || [];

  const ProfilePicture = () => {
    return (
      <img
        className="antialiased rounded-lg shadow-lg"
        src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png"
        width="192px"
        height="192px"
        alt="User profile"
      />
    );
  };

  return (
    <div>
      <div className="w-full bg-orange-100">
        <div className="mx-auto">
          <div className="">
            <div className="items-end w-1/3 mx-auto md:flex ">
              <div className="w-1/3 m-6 mx-auto ">
                <ProfilePicture />
              </div>
              <div className="m-auto md:flex">
                <div className="flex-col mx-auto mt-3 text-center">
                  <h3 className="mb-3 text-lg font-bold text-gray-900 lg:text-4xl">
                    {myData.firstName} {myData.lastName}
                  </h3>
                  <div>
                    <p className="px-2 py-1 mx-auto mb-2 bg-orange-300 rounded w-max">
                      {myData.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mb-2 rounded ">
            <div className="lg:flex">
              <div className="flex-col m-2 lg:w-1/2 md:w-full ">
                <h2 className="text-center lg:text-lg">
                  <b>All Events</b>
                </h2>

                {myEvents &&
                  myEvents.map((event) => (
                    <div
                      key={event._id}
                      className="relative flex-col w-4/5 p-3 m-auto mt-2 antialiased text-center bg-white rounded-lg shadow-lg xsm:w-3/5"
                    >
                      <div className="flex-row">
                        <div className="pb-1 text-2xl text-amber-500">
                          <span>{event.title}</span>
                          {event.verifyNumber >= event.attendees.length && (
                            <div className="inline-block group">
                              <p className="invisible inline-block text-sm group-hover:visible">
                                Event Verified!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="m-auto font-bold text-center text-black cursor-pointer text-normal hover:text-cyan-700">
                        <Link to={`/profile/${event.host._id}`}>
                          {event.host.firstName} {event.host.lastName}
                        </Link>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{event.date}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{event.location}</p>
                      </div>
                      <div className="flex-col">
                        <div className=" hover:text-orange-300">
                          <a href={event.url}>
                            <span className="italic">Event Website</span>
                          </a>
                        </div>
                        <div className="relative flex flex-col group ">
                          <span>{event.attendees.length} kind attendees</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
