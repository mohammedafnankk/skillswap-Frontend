import React, { useEffect, useState } from "react";
import axiosInstencs from "../../axios/axiosInstence";
import profileImg from "../../assets/images/user.jpg";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Search from "./Search";
import socket from "../../Socket";

function Dashboard() {
  const navigate = useNavigate()
  const access_token = localStorage.getItem("access_token")
  const userID = localStorage.getItem("id")
  //  console.log(access_token,"access_token");
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [user, setUser] = useState([]);
  // const [userID,setUserID]= useState("")
  const [mentor, setMentor] = useState([])

  // axiosInstencs.get('/protect',{
  //   headers:{
  //     "Authorization" :`Bearer ${access_token}`
  //   }
  // }).then((res)=>{
  //     const id =(res.data.user.id);
  //     setUserID(id)
  //     // console.log(res.data.user.id);

  // }).catch((err)=>{
  //   console.log("protect Error:",err);

  // //   axiosInstencs.post('/refresh-token',{
  // //     token:refresh_token,
  // // }).then((res)=>{
  // //   console.log(res.data);

  // //     localStorage.setItem("access_token",res.data.accessToken)
  // //     localStorage.setItem("refresh_token",res.data.refreshToken)
  // // }).catch((err)=>{
  // //     console.log(err)
  // //     // localStorage.clear()
  // // })
  // })


  useEffect(() => {



    setIsLoading2(true)
    axiosInstencs.get(`/singleuser/${userID}`, {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    }).then((res) => {
      // console.log(res.data.msg);
      const userData = (res.data.msg)
      setUser(userData)
      setIsLoading2(false)
    })

  }, [userID, access_token]);
  useEffect(() => {
    setIsLoading(true)
    {
      user.role === "Student" ?


        axiosInstencs.get(`sug/${userID}`, {
          headers: {
            "Authorization": `Bearer ${access_token}`
          }
        }).then((res) => {
          // console.log(res.data.data);
          setMentor(res.data.data)
          setIsLoading(false)

        })

        : ""
    }
  }, [user, userID, access_token])

  return (
    <div className=" ">
      <div className=" fixed z-50">
        <Sidebar />
      </div>
      <div className="fixed w-[83%] z-20 ml-[224px] max-lg:ml-0 max-lg:w-full">
        <Search />
      </div>
      {isLoading2 ?
        <div class=" rounded-md p-4 max-w-sm w-full mx-auto pt-[10%] ">
          <div class="animate-pulse flex flex-col space-x-4 items-center ">
            <div class="rounded-full bg-gray-300 h-20 w-20 mb-2"></div>
            <div class="flex-1 space-y-6 py-1 w-[150%] max-sm:w-[100%]">
              <div class="h-4 bg-gray-300 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                  <div class="h-4 bg-gray-300 rounded col-span-1"></div>
                  <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                </div>
                <div class="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="space-y-8 py-6 px-4 ml-[224px] max-lg:ml-0 pt-24 bg-gray-50">
          {/* <div><a href="#section-3">Mentor</a></div> */}

          <section className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 p-6 md:p-10 text-white">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold mb-4">Welcome to SkillSwap</h1>
              {user.role === "Mentor" ?
                <p className="mb-3 text-[17px]">
                  Empower Learners Through Real-Time Mentoring
                  As a mentor, you play a key role in guiding students through their programming journey. Our platform connects you directly with learners seeking help, allowing you to share your expertise, answer questions in real time, and provide personalized support. Help students overcome challenges, build real skills, and grow their confidence — all through interactive chat sessions.
                </p>
                : user.role === "Student" ?
                  <p className="mb-3 text-[17px]">Connect with Experienced Mentors and Accelerate Your Learning
                    Our platform bridges the gap between students and expert mentors through real-time chat-based guidance. Whether you're stuck on a coding problem or exploring new technologies, mentors are here to support you with personalized explanations, hands-on help, and career advice — helping you grow faster, with confidence.</p>
                  : ""}

              <div className="flex gap-4">
                <a href="#mentors" className="text-sm px-[20px] py-[10px] rounded-md bg-white hover:bg-gray-100 text-purple-700 font-medium">
                  Find your skill based Mentors
                </a>
                {/* <button className="text-sm px-[20px] py-[10px] rounded-md bg-gradient-to-br from-indigo-700 to-purple-600 hover:bg-gray-100 text-white font-medium">
                Explore Skills
              </button> */}
              </div>
            </div>
          </section>
          <section>
            <div className="flex justify-between mb-6 items-center max-sm:mb-3">
              <h2 className="text-2xl font-semibold">Support & Teaching</h2>
              {/* <button className="rounded-md px-[20px] py-[10px] text-purple-700 hover:bg-gray-100 text-sm">
              View all <i class="fa-solid fa-arrow-right pl-2"></i>
            </button> */}
            </div>
            <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-wrench p-4 rounded-lg bg-teal-100 text-teal-700 w-fit"></i>
                    {/* <i class="fa-solid fa-code "></i> */}
                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">
                    Fundamental Concepts
                  </h3>
                  {/* <p className="text-sm text-gray-600">
                  Software development, web, mobile, and more
                </p> */}
                  <div className="text-sm text-gray-600">
                    <li>Teaching HTML/CSS basics</li>
                    <li>Explaining JavaScript data types & control flow</li>
                    <li>DOM manipulation and event handling</li>
                    <li>Intro to ES6+ features (arrow functions, spread, destructuring)</li>
                  </div>
                </div>
                {/* <div className="cursor-pointer flex justify-between items-center hover:bg-[#f1f5f9] px-[20px] py-[10px] rounded-[8px] text-sm">
                <button>Explore</button>
                <i class="fa-solid fa-arrow-right"></i>
              </div> */}
              </div>
              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-brands fa-fort-awesome p-4 rounded-lg bg-purple-100 text-purple-700 w-fit"></i>
                    {/* <i class="fa-solid fa-palette"></i> */}
                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">Frontend Development</h3>
                  {/* <p className="text-sm text-gray-600">
                  UI/UX, graphic design, and visual arts
                </p> */}
                  <div className="text-sm text-gray-600">
                    <li>React basics (JSX, props, state, hooks)</li>
                    <li>Component architecture</li>
                    <li>React Router and state management</li>
                    <li>Tailwind CSS and UI design guidance</li>
                  </div>
                </div>
                {/* <div className="cursor-pointer flex justify-between items-center hover:bg-[#f1f5f9] px-[20px] py-[10px] rounded-[8px] text-sm">
                <button>Explore</button>
                <i class="fa-solid fa-arrow-right"></i>
              </div> */}
              </div>
              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-trowel-bricks p-4 rounded-lg bg-yellow-100 text-yellow-700 w-fit"></i>
                    {/* <i class="fa-regular fa-lightbulb "></i> */}
                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">Backend Development</h3>
                  {/* <p className="text-sm text-gray-600">
                  Marketing, entrepreneurship, and management
                </p> */}
                  <div className="text-sm text-gray-600">
                    <li>Node.js fundamentals</li>
                    <li>Express routing, middleware, and REST APIs</li>
                    <li>MongoDB schema design and queries</li>
                    <li>Authentication (JWT, sessions)</li>
                  </div>
                </div>
              </div>
              {/* <div className="cursor-pointer flex justify-between items-center hover:bg-[#f1f5f9] px-[20px] py-[10px] rounded-[8px] text-sm">
                <button>Explore</button>
                <i class="fa-solid fa-arrow-right"></i>
              </div> */}


              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-brain p-4 rounded-lg bg-pink-100 text-pink-600 w-fit"></i>
                    {/* <i class="fa-solid fa-book-open "></i> */}
                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">Debugging & Problem Solving</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li> Helping users debug code step-by-step</li>
                    <li>Console errors and stack traces</li>
                    <li>Browser dev tools and network requests</li>
                    <li>Logic bugs and edge cases</li>
                  </div>







                </div>
                {/* <div className="cursor-pointer flex justify-between items-center hover:bg-[#f1f5f9] px-[20px] py-[10px] rounded-[8px] text-sm">
                <button>Explore</button>
                <i class="fa-solid fa-arrow-right"></i>
              </div> */}
              </div>

              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-box p-4 rounded-lg bg-green-100 text-green-700 w-fit"></i>
                    {/* <i class="fa-solid fa-book-open"></i> */}
                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">Tooling & Environment Setup</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li> Git & GitHub basics (cloning, branches, PRs)</li>
                    <li>Using VS Code, extensions, and linters</li>
                    <li>Setting up local servers and database connections</li>








                  </div>







                </div>
                {/* <div className="cursor-pointer flex justify-between items-center hover:bg-[#f1f5f9] px-[20px] py-[10px] rounded-[8px] text-sm">
                <button>Explore</button>
                <i class="fa-solid fa-arrow-right"></i>
              </div> */}
              </div>

              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-rocket p-4 rounded-lg bg-rose-100 text-rose-700 w-fit"></i>
                    {/* <i class="fa-solid fa-book-open "></i> */}
                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">Project Guidance</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li>Structuring full-stack apps</li>
                    <li>Suggesting mini-projects and use cases</li>
                    <li>Reviewing code and giving feedback</li>
                    <li>Deployment with platforms like Render, Vercel, Netlify</li>

                  </div>







                </div>
                {/* <div className="cursor-pointer flex justify-between items-center hover:bg-[#f1f5f9] px-[20px] py-[10px] rounded-[8px] text-sm">
                <button>Explore</button>
                <i class="fa-solid fa-arrow-right"></i>
              </div> */}
              </div>

              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-person-arrow-up-from-line p-4 rounded-lg bg-blue-100 text-blue-700 w-fit"></i>

                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">Soft Skills & Career Mentoring</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li> How to write clean code</li>
                    <li>Preparing for tech interviews</li>
                    <li>Contributing to open-source</li>
                    <li>Resume and portfolio reviews</li>








                  </div>







                </div>
                {/* <div className="cursor-pointer flex justify-between items-center hover:bg-[#f1f5f9] px-[20px] py-[10px] rounded-[8px] text-sm">
                <button>Explore</button>
                <i class="fa-solid fa-arrow-right"></i>
              </div> */}
              </div>
            </div>

          </section>
    <section id="mentor-section">
      <div className="flex justify-between mb-6 items-center max-sm:mb-3">
              <h2 className="text-2xl font-semibold">Informational & Educational</h2>
              
            </div>
   
      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
     <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-chalkboard-user p-4 rounded-lg bg-blue-100 text-blue-700 w-fit"></i>
                    

                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">Teaching Techniques</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li> How to teach coding to beginners</li>
                    <li>Explaining complex concepts simply</li>
                    <li>Common student mistakes & how to address them</li>
                    <li>When to guide vs when to give answers</li>








                  </div>







                </div>
            
              </div>
     <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-compass p-4 rounded-lg bg-yellow-100 text-yellow-700 w-fit"></i>
                    

                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">Mentor Guidelines & Best Practices</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li> Code of conduct for mentors</li>
                    <li>How to handle inappropriate or off-topic questions</li>
                    <li>Maintaining professionalism in chat</li>
                    <li>Giving constructive feedback</li>








                  </div>







                </div>
            
              </div>
     <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-laptop-code p-4 rounded-lg bg-teal-100 text-teal-700 w-fit"></i>
                    

                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2"> Curriculum Insights</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li> Overview of topics students are learning</li>
                    <li>Curriculum outline: HTML → CSS → JS → React → Backend</li>
                    <li>Suggested ways to supplement their learning</li>
                  








                  </div>







                </div>
            
              </div>
     <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-headset p-4 rounded-lg bg-purple-100 text-purple-700 w-fit"></i>
                    

                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2"> Live Chat Scenarios</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li>Sample mentorship conversations (chat templates)</li>
                    <li>How to respond to “I don’t understand” effectively</li>
                    <li>How to debug with a student in chat</li>
                  








                  </div>







                </div>
            
              </div>
     <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-screwdriver-wrench p-4 rounded-lg bg-indigo-100 text-indigo-700 w-fit"></i>
                    
                    

                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2"> Tools for Mentoring</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li>Using GitHub to collaborate with students</li>
                    <li>Free tools for diagrams, code sharing (CodeSandbox, Replit)</li>
                    <li>Quick cheatsheets to share (JS methods, CSS tips)</li>
                  








                  </div>







                </div>
            
              </div>
     <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-person-arrow-up-from-line p-4 rounded-lg bg-green-100 text-green-700 w-fit"></i>
                   

                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2"> Mentor Growth</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li>How mentoring improves your own skills</li>
                    <li>How to list mentoring experience on LinkedIn</li>
                    <li>Building a portfolio through mentorship</li>
                    <li>Becoming a senior mentor or contributor</li>
                  








                  </div>







                </div>
            
              </div>
     <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow max-sm:p-5 bg-white">
                <div className="pb-6">
                  <div className="flex justify-between items-start">
                    <i class="fa-solid fa-book p-4 rounded-lg bg-sky-100 text-sky-700 w-fit"></i>
                    

                    {/* <div className="px-2.5 py-0.5 text-xs font-[550] border rounded-full inline-flex items-center">
                    245 mentors
                  </div> */}
                  </div>
                  <h3 className="text-2xl font-semibold mt-2 pb-2">FAQs / Help for Mentors</h3>
                  {/* <p className="text-sm text-gray-600">
                  Teaching, learning, and academic skills
                </p> */}
                  <div className="text-gray-600 text-sm">
                    <li>What to do if a student is inactive</li>
                    <li>How to report a technical issue</li>
                    <li>What if I don’t know the answer?</li>
                    
                  








                  </div>







                </div>
            
              </div>
      </div>
    </section>

          {user.role === "Mentor" ? "" :

            <section>
              <div>
                <div>  <h2 className="text-2xl font-semibold pb-3">Level Up Your Coding Skills — One Chat at a Time</h2></div>
              </div>
              <div className="rounded-md shadow-md bg-white px-6 py-3">

                <p className="text-md text-gray-400">
                  <div className="flex justify-between items-start">

                    <i class="fa-solid fa-message p-4 rounded-lg bg-emerald-100 text-emerald-700 w-fit mb-2"></i>
                  </div>
                  Our platform delivers programming knowledge through interactive chats. Whether you're a beginner or growing your stack, get hands-on help and learn in a way that feels natural and fast.
                </p>
              </div>
            </section>
          }
          {user.role === "Mentor" ? "" :

            <div>
              {isLoading ?
                <div class=" rounded-md p-4 max-w-sm w-full mx-auto pt-[10%] ">
                  <div class="animate-pulse flex flex-col space-x-4 items-center ">
                    <div class="rounded-full bg-gray-300 h-20 w-20 mb-2"></div>
                    <div class="flex-1 space-y-6 py-1 w-[150%] max-sm:w-[100%]">
                      <div class="h-4 bg-gray-300 rounded"></div>
                      <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                          <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                          <div class="h-4 bg-gray-300 rounded col-span-1"></div>
                          <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                        </div>
                        <div class="h-4 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                :

                <div>

                  <section id="mentors">

                    <div className="flex justify-between mb-6 items-center max-sm:mb-3">
                      <h2 className="text-2xl font-semibold">Mentors</h2>
                      <button onClick={() => navigate(`/all-mentors/${user._id}`)} className="rounded-md px-[20px] py-[10px] text-purple-700 hover:bg-gray-100 text-sm">
                        View all <i class="fa-solid fa-arrow-right pl-2"></i>
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
                      {mentor.map((m, i) => (

                        <div key={i} className="rounded-lg border shadow-sm hover:shadow-md transition-shadow bg-white">
                          <div className="p-6 max-sm:p-3">
                            <div className="flex items-start space-x-4">
                              <span className="relative">
                                <img
                                  src={m.avatar ? m.avatar : profileImg}
                                  alt=""
                                  className="h-16 w-16 overflow-hidden rounded-full border-2 border-purple-100 object-cover"
                                />
                              </span>
                              <div>
                                <h2 className="font-bold text-lg">{m.username}</h2>
                                <p className="text-gray-500">Senior Developer</p>
                                <div></div>
                              </div>
                            </div>
                            <div className=" mt-4 grid grid-cols-3 gap-2">
                              {m.skills.map((s, i) => (

                                <div key={i} className="inlile-flex items-center rounded-full px-2.5 py-0.5 text-xs font-[550] max-sm:font-medium bg-[#f1f5f9] ">
                                  {s}
                                </div>
                              ))}
                             
                            </div>
                          </div>
                          <div className="flex items-center p-6 pt-0">
                            <Link to={`/mentor/${m._id}/${user._id}`} className=" text-white inline-flex items-center justify-center rounded-md text-sm font-[550] max-sm:font-medium bg-purple-600 hover:bg-purple-700 px-4 py-2 w-full">
                              View Profile
                            </Link>
                          </div>
                        </div>
                      ))}
                      
                    </div>
                  </section>
                  <section className="rounded-lg bg-gray-100 p-10 mt-8 max-sm:p-5">
                    <div className="flex items-center justify-between gap-6 max-sm:flex-col">
                      <div>
                        <h2 className="text-2xl font-bold mb-2 max-sm:text-md max-sm:mb-1">
                          Ready to share your knowledge?
                        </h2>
                        <p className="text-[#94a3b8] max-sm:text-sm">
                          Become a mentor and help others grow while expanding your
                          network.
                        </p>
                      </div>
                      <button className="text-sm rounded-md px-8 bg-purple-600 hover:bg-purple-700 text-white py-4">
                        <span className="" onClick={() => navigate(`/all-mentors/${user._id}`)}>Become a Mentor</span>   <i class="fa-solid fa-bolt pl-2"></i>
                      </button>
                    </div>
                  </section>
                </div>
              }
            </div>

          }
        </div>
      }
    </div>
  );
}

export default Dashboard;
