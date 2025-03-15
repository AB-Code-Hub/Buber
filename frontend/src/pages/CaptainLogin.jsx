import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {

     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [captainData, setCaptainData] = useState({})
      const handleSubmit = (e) => {
        e.preventDefault();
          setCaptainData({
            email:email,
            password: password,
          })
          
        setEmail("")
        setPassword("")
      };


  return (
    <div className="p-7 h-screen flex flex-col justify-between lg:pl-48 lg:pr-48 lg:pb-48">
    <div>
      <img
        className="w-20  mb-2 lg:w-28 "
        src="./drive-logo.png"
        alt="logo"
      />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h3 className="text-lg mb-2 font-medium ">
          What's your email address
        </h3>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
          placeholder="email@example.com"
          className="bg-[#eeeeee] mb-7 rounded px-4 border py-2 w-full text-lg placeholder:text-base"
        />
        <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
          placeholder="password"
          className="bg-[#eeeeee] mb-7 rounded px-4 border py-2 w-full text-lg placeholder:text-base"
        />
        <button className="bg-[#111] text-white text-2xl font-semibold mb-5 rounded px-4  py-2 w-full  placeholder:text-base">
          Login
        </button>
      </form>

      <p className="text-center mb-2 text-base lg:text-lg font-medium">
      Join the Movement, Drive the Future?
        <Link to="/captain-signup" className="text-blue-600">
           Register as a Captain
        </Link>
      </p>
    </div>
    <div >
      <Link to='/login' className="bg-blue-500 justify-center items-center text-white text-2xl flex  font-semibold mb-7 rounded px-4  py-2 w-full  placeholder:text-base">
       Login as User
      </Link>
    </div>
  </div>
  )
}

export default CaptainLogin