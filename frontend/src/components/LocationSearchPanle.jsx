import React from "react";
import { MapPin } from "lucide-react";
import toast from 'react-hot-toast';

const LocationSearchPanle = ({  suggestions, searchType, setPickupLocation, setDestination }) => {
  const handleLocationSelect = (suggestion) => {
    if (!suggestion) {
      toast.error('Invalid location selected. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    if (searchType === "pickup") {
      setPickupLocation(suggestion);
      toast.success('Pickup location set!', {
        duration: 2000,
        position: 'top-center',
      });
    } else if (searchType === "destination") {
      setDestination(suggestion);
      toast.success('Destination set!', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="py-10">
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            onClick={() => handleLocationSelect(suggestion.description)}
            className="flex p-3 border-2 border-gray-200 rounded-xl justify-start active:border-2 active:border-black active:rounded-xl active:bg-gray-100 items-center my-2 gap-4 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <h2 className="bg-[#eee] size-10 rounded-full flex justify-normal items-center p-2">
              <p className="w-full h-full">
                <MapPin />
              </p>
            </h2>
            <h4 className="font-medium">{suggestion.description}</h4>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">
          Type to see location suggestions
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanle;
