import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const avatars = [
  'https://lh6.ggpht.com/-jaAm1eO765Q/AAAAAAAAAAI/AAAAAAAAAAA/HfmyBFH1UZs/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh4.ggpht.com/-Cu-MPkJG_4Y/AAAAAAAAAAI/AAAAAAAAAAA/DX_BrEbhVuQ/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh5.ggpht.com/-hgFk-liXn3A/AAAAAAAAAAI/AAAAAAAAAAA/A16JG3gJSpU/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh5.ggpht.com/-HsotJk0cfrw/AAAAAAAAAAI/AAAAAAAAAAA/z3atZ66qn0A/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh3.ggpht.com/-KmajRHZh-sw/AAAAAAAAAAI/AAAAAAAAAAA/MCXjoNGSZO0/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh4.ggpht.com/-rImN8nsM2fY/AAAAAAAAAAI/AAAAAAAAAAA/iL9CadC9kXw/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh5.ggpht.com/-xeAcqbCc1fs/AAAAAAAAAAI/AAAAAAAAAAA/g9V9J9JSvos/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh3.ggpht.com/-sSicK12N2DM/AAAAAAAAAAI/AAAAAAAAAAA/vXSAqNet4Ag/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh3.ggpht.com/-iy8gIz3zJYY/AAAAAAAAAAI/AAAAAAAAAAA/zzUjb0ENeaw/s128-c0x00000000-cc-rp-mo/photo.jpg',
  'https://lh3.ggpht.com/-hReL3evr7Wg/AAAAAAAAAAI/AAAAAAAAAAA/fjuD5e2zxv8/s128-c0x00000000-cc-rp-mo/photo.jpg',
];
const initialState = {
  avatar: '',
  rating: 1,
  author: '',
  comment: '',
};

const getRandomAvatar = avatars => avatars[Math.floor(Math.random() * (avatars.length - 1))];

function AddReviewForm({ handleSubmit, handleCancel }) {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'SET_RATING': {
        return { ...state, rating: action.payload };
      }
      case 'SET_AUTHOR': {
        return { ...state, author: action.payload };
      }
      case 'SET_COMMENT': {
        return { ...state, comment: action.payload };
      }
      case 'RESET': {
        return initialState;
      }
      default: {
        return state;
      }
    }
  }, initialState);

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

          const data = { ...state, avatar: getRandomAvatar(avatars), date: new Date() };

          handleSubmit(e, data);
        }}
      >
        <div className="px-4 pt-4 pb-2 border-b">
          <div className="text-xs leading-none">Rating</div>
          <div className="mt-1">
            <div className="flex justify-around py-1">
              <label role="button" tabIndex="0" className="cursor-pointer">
                <Icon
                  className={state.rating === 1 ? 'text-gray-900' : 'text-gray-600'}
                  icon="angry"
                  size="3x"
                />
                <input
                  className="hidden"
                  type="radio"
                  name="rating"
                  value="1"
                  checked={state.rating === 1}
                  onChange={e => {
                    dispatch({ type: 'SET_RATING', payload: +e.target.value });
                  }}
                />
              </label>
              <label role="button" tabIndex="0" className="cursor-pointer">
                <Icon
                  className={state.rating === 2 ? 'text-gray-900' : 'text-gray-600'}
                  icon="frown"
                  size="3x"
                />
                <input
                  className="hidden"
                  type="radio"
                  name="rating"
                  value="2"
                  checked={state.rating === 2}
                  onChange={e => {
                    dispatch({ type: 'SET_RATING', payload: +e.target.value });
                  }}
                />
              </label>
              <label role="button" tabIndex="0" className="cursor-pointer">
                <Icon
                  className={state.rating === 3 ? 'text-gray-900' : 'text-gray-600'}
                  icon="meh"
                  size="3x"
                />
                <input
                  className="hidden"
                  type="radio"
                  name="rating"
                  value="3"
                  checked={state.rating === 3}
                  onChange={e => {
                    dispatch({ type: 'SET_RATING', payload: +e.target.value });
                  }}
                />
              </label>
              <label role="button" tabIndex="0" className="cursor-pointer">
                <Icon
                  className={state.rating === 4 ? 'text-gray-900' : 'text-gray-600'}
                  icon="smile"
                  size="3x"
                />
                <input
                  className="hidden"
                  type="radio"
                  name="rating"
                  value="4"
                  checked={state.rating === 4}
                  onChange={e => {
                    dispatch({ type: 'SET_RATING', payload: +e.target.value });
                  }}
                />
              </label>
              <label role="button" tabIndex="0" className="cursor-pointer">
                <Icon
                  className={state.rating === 5 ? 'text-gray-900' : 'text-gray-600'}
                  icon="laugh"
                  size="3x"
                />
                <input
                  className="hidden"
                  type="radio"
                  name="rating"
                  value="5"
                  checked={state.rating === 5}
                  onChange={e => {
                    dispatch({ type: 'SET_RATING', payload: +e.target.value });
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4 pb-2 border-b">
          <div className="text-xs leading-none">Name</div>
          <div className="mt-1">
            <input
              className="w-full py-1"
              type="text"
              placeholder="Enter your name"
              value={state.author}
              onChange={e => {
                dispatch({ type: 'SET_AUTHOR', payload: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="px-4 pt-4 pb-2">
          <div className="text-xs leading-none">Comment</div>
          <div className="mt-1">
            <textarea
              className="w-full py-1"
              type="text"
              rows="4"
              placeholder="Write a comment about your experience"
              value={state.comment}
              onChange={e => {
                dispatch({ type: 'SET_COMMENT', payload: e.target.value });
              }}
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

export default AddReviewForm;
