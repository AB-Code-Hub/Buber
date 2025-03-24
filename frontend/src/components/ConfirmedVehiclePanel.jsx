import { ChevronDown, MapPin, MapPinned } from 'lucide-react';
import React from 'react'

const ConfirmedVehiclePanel = ({ confirmedVehiclePanelRef, setConfirmedVehiclePanel }) => {
  return (
    <div
      ref={confirmedVehiclePanelRef}
      className="fixed w-full z-10 bottom-0 bg-white translate-y-full py-6 px-3 pt-12 p-3"
    >
      <h5
        className="p-3 text-center absolute top-[6%]  right-0"
        onClick={() => {
          setConfirmedVehiclePanel(false);
        }}
      >
        <ChevronDown size={40} />
      </h5>

      <h2 className="text-2xl font-semibold mb-5">Confirm your ride </h2>

      <div className='flex flex-col justify-between items-center gap-2'>
        <img
          className="size-56 object-contain"
          src="./Buber-car.png"
          alt="vehicle"
        />
        <div className='w-full '>
          <div className='flex items-center gap-5'>
            <MapPin color='white' fill='black' size={30} />
            <div>
              <h3 className='text-lg font-semibold'>123 Main St</h3>
              <p className='text-base '>Springfield, USA</p>
            </div>
          </div>
          <div>2</div>
          <div>2</div>
        </div>

        <button className='w-full text-white p-2 font-semibold rounded-xl text-lg bg-blue-600'>Confirm Ride</button>
      </div>
    </div>
  )
}

export default ConfirmedVehiclePanel;