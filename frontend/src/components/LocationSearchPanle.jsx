import React from 'react'
import {MapPin} from 'lucide-react'

const LocationSearchPanle = () => {
  return (
    <div>

        <div className='flex justify-start items-center'>
            <h2 className='bg-[#eee] size-10 rounded-full flex justify-normal items-center p-2'><p className='w-full h-full'><MapPin /></p></h2>
            <h4>34B, Near York, England</h4>
        </div>

    </div>
  )
}

export default LocationSearchPanle