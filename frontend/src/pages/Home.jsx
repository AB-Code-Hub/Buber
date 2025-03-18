import React from 'react'

const Home = () => {
  return (
    <div className='relative h-screen w-screen overflow-x-hidden lg:overflow-x-hidden '>
      <img className='w-16 absolute left-3 top-3  ' src="./App-icon.png" alt="logo" />

      <div className='h-screen w-screen'>
        <img className='-z-10 w-full h-full object-cover ' src="./home-map.png" alt="map-image" />
      </div>

      <div className='bg-white absolute top-0 w-full p-5 '>
        <h4 className='text-3xl font-semibold mb-3'>Find a trip</h4>
        <form>
          <input type="text"
            className='bg-[#eee] text-lg font-normal rounded-lg px-8 py-4 mt-3 w-[90%]'
            placeholder='Add a pick-up location'
          />
          <input type="text" 
            className='bg-[#eee] text-lg font-normal px-8 py-4 rounded-lg mt-3 placeholder:text-lg w-[90%]'
            placeholder='Enter your destination'
          />
        </form>
      </div>
    </div>
  )
}

export default Home