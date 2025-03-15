import React from "react";
import {Link} from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className="h-screen pt-8 flex justify-between flex-col w-full md:bg-[url(https://images.unsplash.com/photo-1482029255085-35a4a48b7084?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-[url(./main.png)] sm:bg-[url(./main.png)] lg:bg-bottom lg:bg-[url(https://images.unsplash.com/photo-1482029255085-35a4a48b7084?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
        <img className="w-16 ml-8 sm:w-12 sm:ml-4 lg:w-20 lg:ml-10" src="./App-icon.png" alt="logo" />
        <div className="bg-white pb-7 py-4 px-4 sm:pb-5 sm:py-3 sm:px-3 lg:pb-9 lg:py-5 lg:px-5">
          <h2 className="text-3xl font-bold sm:text-2xl lg:text-4xl lg:text-center">Get Startetd with Buber</h2>
          <Link to='/login'  className=" w-full justify-center items-center flex bg-black text-white py-3 rounded mt-4 sm:py-2 sm:mt-3 lg:py-4 lg:mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
