import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstencs from "../../axios/axiosInstence";

function Search() {
// const [notifi,setNoti]= useState([])
// const 
//   useEffect(()=>{
//    axiosInstencs.get(`/notification/${id}`,{
//     headers:{
//       "Authorization" :`Bearer ${access_token}`
//     }
//    }).then((res)=>{
//     console.log(res.data.msg)
//     setNoti(res.data.msg)
//    })
//   },[id])

  return (
    <div className="">
      <div className="flex justify-between px-4 py-4 bg-white border-b border- shadow-md ">
        <div className="items-center">
          <div className="w-full max-w-2xl">
            <div className="relative w-[151%]">
              {/* <i class="fa-solid fa-magnifying-glass absolute top-2 text-gray-500 text-sm left-3"></i> */}
              {/* <input
                type="text"
                placeholder="Search..."
                className="rounded-md focus:outline-purple-700 px-3 py-2 text-sm pl-10 w-full border"
              /> */}
              <div className="hidden max-lg:block">

              <Link
                to={"/dashboard"}
                className="px-4 flex items-center max-lg:justify-center"
              >
                
                <i class="fa-solid fa-graduation-cap text-3xl text-purple-900 pr-1"></i>
                <h1 className="font-sans text-xl font-bold text-purple-900">
                  SkillSwap
                </h1>
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* {notifi.map((m,i)=>(
            <div key={i}>
              <p>{m.text}</p>
            </div>
          ))} */}
          <button className="inline-flex items-center justify-center rounded-md relative">
            {/* <i class="text-lg bx bx-bell p-1 px-2 hover:bg-gray-200 rounded-md"></i> */}
            <i class="fa-regular fa-bell fa-regular p-1 px-2 hover:bg-gray-200 rounded-md text-lg "></i>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-700 animate-ping"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
