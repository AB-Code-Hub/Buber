import axios from 'axios';
import { GOOGLE_MAP_API_KEY } from '../config/env.js';

export const getAddressCordinates = async (address) => {
    try {
        const apiKey = GOOGLE_MAP_API_KEY; 
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        } else {
            throw new Error(`Geocoding error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
};


export const getDistanceTimeService = async (origin, destination) => {

 try {
       if(!origin || !destination) {
           throw new Error('Origin and Destination are required');
       }
   
       const apiKey = GOOGLE_MAP_API_KEY;
   
       const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
           params: {
               origins: origin,
               destinations: destination,
               key: apiKey
           }
       });

       if(response.data.rows[0].elements[0].status === 'NOT_FOUND') {
        throw new Error('Origin or Destination not found');
    }

       if (response.data.status === 'OK') {
           const element = response.data.rows[0].elements[0];
            return element;
       } else {
           throw new Error(`Distance and time error: ${response.data.status}`);
       }

 } catch (error) {
     console.error('Error fetching distance and time:', error.message);
     throw error;
    
 }

}


export const getSuggestionsService = async (input) => {

        if (!input) {
            throw new Error('Input is required');
        }

        try {
            const apiKey = GOOGLE_MAP_API_KEY;
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
                params: {
                    input,
                    key: apiKey
                }
            });

            if (response.data.status === 'OK') {
                return response.data.predictions;
            } else {
                throw new Error(`Suggestions error: ${response.data.status}`);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error.message);
            throw error;
        }

}