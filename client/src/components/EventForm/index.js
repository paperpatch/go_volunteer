import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_EVENT } from "../../utils/mutations";
import { QUERY_EVENTS } from "../../utils/queries";

export default function NewEvent({ onEventSubmit, showSuccessMod }) {

  const categories = [
    { name: 'Children & Youth' },
    { name: 'Community' },
    { name: 'Environment' },
    { name: 'Health & Medicine' },
    { name: 'Sports & Recreation' }
  ];

  const [formData, setFormData] = useState({
    host: "",
    category: categories[0]._id,
    title: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    url: "",
    image: "",
  });

  const [addEvent, { error }] = useMutation(CREATE_EVENT, {
    update(cache, { data: { createEvent } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });
        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: [createEvent, ...events] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  // update state based on form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log ({...formData})
    e.preventDefault();
    try {
      await addEvent({
        variables: { ...formData },
      });
      setFormData({
        host: "",
        category: categories[0]._id,
        title: "",
        description: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        url: "",
        image: "",
      });
    } catch (e) {
      console.error(e);
    }
    onEventSubmit();
    showSuccessMod();
  };

  if (error) return <>Something went wrong!</>;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-center">Add an Event</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-host"
            >
              Host
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-host"
              type="text"
              placeholder="Host"
              name="host"
              value={formData.host}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-category"
            >
              Category
            </label>
            <div className="select-container">
              <select name="category" id="selectList" value={this} onChange={handleChange}>
                <option value={categories[0]._id}>Children & Youth</option>
                <option value={categories[1]._id}>Community</option>
                <option value={categories[2]._id}>Environment</option>
                <option value={categories[3]._id}>Health & Medicine</option>
                <option value={categories[4]._id}>Sports & Recreation</option>
              </select>
            </div>
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-title"
            >
              Title
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-title"
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-description"
            >
              Description
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-description"
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-location"
            >
              Location
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-location"
              type="text"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-date"
            >
              Date
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-date"
              type="date"
              placeholder="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-startTime"
            >
              Start Time
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-startTime"
              type="time"
              placeholder="Start Time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-endTime"
            >
              End Time
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-endTime"
              type="time"
              placeholder="End Time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-url"
            >
              Website
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-url"
              type="url"
              placeholder="https://www.example.com"
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-url"
            >
              Upload Image
              <i className="fas fa-image "></i>
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-image"
              type="text"
              placeholder=""
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          title="Submit"
          className="w-full p-3 rounded-lg shadow-lg"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};