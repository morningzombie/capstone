import React from 'react';

export default function FavButton({
  isGoing,
  auth,
  addToFavorites,
  savedAsFav,
  setSavedAsFav,
  removeFromFavorites,
  eventDetail,
}) {
  return (
    <div>
      {savedAsFav ? (
        <button
          className="btn btn-dark"
          onClick={() => {
            removeFromFavorites({ ...savedAsFav, isFavorite: false });
            //setSavedAsFav({ ...savedAsFav, isFavorite: false });
          }}
        >
          Favorite remove
        </button>
      ) : (
        <div>
          {isGoing ? (
            <button
              onClick={() => {
                // setSavedAsFav({ ...isGoing, isFavorite: true });
                addToFavorites({ ...isGoing, isFavorite: true });
              }}
              className="btn btn-dark"
            >
              store in favorites
            </button>
          ) : (
            <button
              onClick={() => {
                //setSavedAsFav({ ...savedAsFav, isFavorite: true });
                addToFavorites({
                  joinedUserId: auth.id,
                  eventId: eventDetail.id,
                  isFavorite: true,
                });
              }}
              className="btn btn-dark"
            >
              store in favorites
            </button>
          )}
        </div>
      )}
    </div>
  );
}
