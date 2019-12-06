import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { getDataURI, uniqid, noop } from '../helpers';

const initialState = {
  name: '',
  cover: '',
  location: { lat: '', lng: '' },
  phoneNumber: '',
  website: '',
  address: '',
  // static values
  gmap: null,
  isOpen: () => true,
  rating: 0,
  ratings: 0,
  reviews: [],
  types: ['restaurant'],
};

function AddRestaurantForm({ location, handleSubmit, handleCancel }) {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'RESET': {
        return initialState;
      }
      case 'SET_COVER': {
        return { ...state, cover: action.payload };
      }
      case 'SET_NAME': {
        return { ...state, name: action.payload };
      }
      case 'SET_PHONE_NUMBER': {
        return { ...state, phoneNumber: action.payload };
      }
      case 'SET_WEBSITE': {
        return { ...state, website: action.payload };
      }
      case 'SET_ADDRESS': {
        return { ...state, address: action.payload };
      }
      case 'SET_LOCATION': {
        return { ...state, location: action.payload };
      }
      case 'SET_LOCATION_LATITUDE': {
        return { ...state, location: { ...state.location, lat: action.payload } };
      }
      case 'SET_LOCATION_LONGITUDE': {
        return { ...state, location: { ...state.location, lng: action.payload } };
      }
      default: {
        return state;
      }
    }
  }, initialState);

  React.useEffect(() => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  }, [location]);

  const handleEscape = React.useCallback(e => e.key === 'Escape' && handleCancel(e), [
    handleCancel,
  ]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <form
        onSubmit={e => {
          e.persist();
          e.preventDefault();

          const data = { ...state, id: uniqid() };

          handleSubmit(e, data);
        }}
      >
        <div className="relative bg-indigo-400 h-64">
          <label className="absolute inset-0">
            {state.cover ? (
              <img className="w-full h-full object-fit" alt={state.name} src={state.cover} />
            ) : (
              <div className="flex flex-col items-center justify-center relative w-full h-full">
                <Icon icon="image" color="#fff" size="8x" />
                <div className="inline-block px-4 py-1 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-lg">
                  Add a preview image
                </div>
                <input
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  type="file"
                  name="cover"
                  accept="image/png, image/jpeg"
                  placeholder="Cover"
                  onChange={e => {
                    getDataURI(e.target.files[0])
                      .then(result => dispatch({ type: 'SET_COVER', payload: result }))
                      .catch(noop);
                  }}
                  required
                />
              </div>
            )}
          </label>
        </div>

        <div className="px-4 pt-4 pb-2 border-b">
          <div className="text-xs leading-none">Name</div>
          <div className="mt-1">
            <input
              className="w-full py-1"
              type="text"
              placeholder="What is the name of the restaurant?"
              value={state.name}
              onChange={e => {
                dispatch({ type: 'SET_NAME', payload: e.target.value });
              }}
              required
            />
          </div>
        </div>

        <div className="px-4 pt-4 pb-2 border-b">
          <div className="text-xs leading-none">Location</div>
          <div className="flex mt-1">
            <div className="w-6/12">
              <input
                className="w-full py-1"
                type="text"
                placeholder="Latitude"
                value={state.location.lat}
                onChange={e => {
                  dispatch({ type: 'SET_LOCATION_LATITUDE', payload: e.target.value });
                }}
                required
              />
            </div>
            <div className="w-6/12">
              <input
                className="w-full py-1"
                type="text"
                placeholder="Longitude"
                value={state.location.lng}
                onChange={e => {
                  dispatch({ type: 'SET_LOCATION_LONGITUDE', payload: e.target.value });
                }}
                required
              />
            </div>
          </div>
        </div>

        <div className="px-4 pt-4 pb-2 border-b">
          <div className="text-xs leading-none">Phone Number</div>
          <div className="mt-1">
            <input
              className="w-full py-1"
              type="text"
              placeholder="Phone Number"
              value={state.phoneNumber}
              onChange={e => {
                dispatch({ type: 'SET_PHONE_NUMBER', payload: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="px-4 pt-4 pb-2 border-b">
          <div className="text-xs leading-none">Website</div>
          <div className="mt-1">
            <input
              className="w-full py-1"
              type="text"
              placeholder="Website"
              value={state.website}
              onChange={e => {
                dispatch({ type: 'SET_WEBSITE', payload: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="px-4 pt-4 pb-2">
          <div className="text-xs leading-none">Address</div>
          <div className="mt-1">
            <input
              className="w-full py-1"
              type="text"
              placeholder="Entrer the address of the restaurant"
              value={state.address}
              onChange={e => {
                dispatch({ type: 'SET_ADDRESS', payload: e.target.value });
              }}
              required
            />
          </div>
        </div>

        <div className="p-4 bg-gray-100">
          <div className="flex justify-end">
            <button
              className="px-4 py-2 text-sm font-semibold text-indigo-600 rounded"
              type="button"
              onClick={e => {
                e.persist();

                dispatch({ type: 'RESET' });
                handleCancel(e);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-indigo-600 rounded"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurantForm;
