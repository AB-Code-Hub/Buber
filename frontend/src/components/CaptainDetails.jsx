import React from "react";

import { Clock2, Gauge, ReceiptText } from "lucide-react";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex justify-between items-center mt-3 lg:mt-0 lg:px-3">
        <div className="flex justify-start items-center gap-3">
          <img
            className="size-10 object-cover rounded-full"
            src="https://rahahome.com/wp-content/uploads/2022/11/2-min-scaled.jpg"
            alt="drive image"
          />
          <h4 className="text-lg font-medium">Bilal</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹899</h4>
          <p className="text-sm font-medium text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex justify-center gap-8 items-start mt-8 p-3 lg:justify-around bg-gray-100 border-2 border-gray-300 rounded-lg">
        <div className="flex  flex-col items-center">
          <Clock2 className="size-7 font-thin " />
          <h5 className="text-lg font-medium">7.5</h5>
          <p className="text-sm font-medium text-gray-600">hours online</p>
        </div>
        <div className="flex  flex-col items-center">
          <Gauge className="size-7 font-thin " />
          <h5 className="text-lg font-medium">100 KM</h5>
          <p className="text-sm font-medium text-gray-600">Total Distance</p>
        </div>
        <div className="flex  flex-col items-center">
          <ReceiptText className=" size-7 font-thin " />
          <h5 className="text-lg font-medium">19</h5>
          <p className="text-sm font-medium text-gray-600">Total Trips</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
