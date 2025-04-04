import React from "react";

const LoadingOne = () => {
  return (
    <div className="flex justify-center mt-4">
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </div>
  );
};

const LoadingTwo = () => {
  return (
    
      <div class="w-full gap-x-2 flex justify-center items-center mt-12">
        <div class="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
        <div class="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
        <div class="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
      </div>
    
  );
};

export { LoadingOne, LoadingTwo };
