import React, { useEffect, useState } from "react";
import axiosInstencs from "../../axios/axiosInstence";
import profileImg from "../../assets/images/user.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Search from "./Search";

function MentorProfile() {
  const { id, myId } = useParams();
  const access_token = localStorage.getItem("access_token")
  const navigate = useNavigate();
  const [mentor, setMentor] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [chatPrev, setChatPrev] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [mChat, setMchat] = useState([]);
  const [mY, setMy] = useState("");
  const [mIsTrue, setMisTrue] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [bio,setBio]= useState("")
  // console.log(id);

  
  useEffect(() => {
    setIsLoading(true)
    axiosInstencs.get(`/mentor/${id}`, {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    }).then((res) => {
      setMentor(res.data.mentor);
      // console.log(res.data.mentor);
      setMchat(res.data.mentor.chats);
      setBio(res.data.mentor.bio)
      setIsLoading(false)
    }).catch((err) => console.log(err))
  }, [id, access_token]);

  useEffect(() => {
    axiosInstencs
      .get(`/singleuser/${myId}`, {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      })
      .then((res) => {
        // console.log(res.data.msg);
        setChatPrev(res.data.msg.chats);
        setMy(res.data.msg.role);
      })
      .catch((err) => console.log(err));
  }, [myId, access_token]);

  const message = () => {
    // console.log(mY);

    // if (chatPrev.length === 0) {
    //   setIsTrue(true);
    //   console.log("length = 0");
    // }
    // chatPrev.map((c) => (c === id ? setIsTrue(false) : setIsTrue(true)));
    // console.log(chatPrev);

    // {
    //   isTrue === true
    //     ? axiosInstencs
    //       .patch(`/add-chat/${myId}`, {
    //         headers: {
    //           "Authorization": `Bearer ${access_token}`
    //         }
    //       }, {
    //         chats: [...chatPrev, id],
    //       })
    //       .then((res) => {
    //         console.log(res.data);
    //         // navigate('/chat')
    //       })
    //       .catch((err) => console.log(err))
    //     : ""
    //   console.log("user already in db");
    // }

    // if (mChat.length === 0) {
    //   setMisTrue(true);
    //   console.log("length = 0");
    // }
    // mChat.map((c) => (c === id ? setMisTrue(false) : setMisTrue(true)));
    // console.log(mChat);

    // {
    //   mIsTrue === true
    //     ? axiosInstencs
    //       .patch(`/add-chat/${id}`, {
    //         headers: {
    //           "Authorization": `Bearer ${access_token}`
    //         }
    //       }, {
    //         chats: [...mChat, myId],
    //       })
    //       .then((res) => {
    //         console.log(res.data);
    //         // navigate("/chat");
    //       })
    //       .catch((err) => console.log(err))
    //     : ""
    //   // console.log("user already in db");
    // }

    // {chatPrev.map((c)=>
    //   c === id || c===""? console.log("true")
    //    : console.log("false")

    // axiosInstencs.patch(`/add-chat/${myId}`,{
    //    chats:[...chatPrev,id]
    // }).then((res)=>{
    //   console.log(res.data);
    //   navigate('/chat')
    // }).catch((err)=>console.log(err))
    // ) }

    // {chatPrev.map((c)=>(
    //   console.log(c ,"ids")
    // ))}
    try {


      axiosInstencs
        .patch(`/add-chat/${myId}`, {
          chats: [...chatPrev, id],
        })
      axiosInstencs
        .patch(`/add-chat/${id}`, {
          chats: [...mChat, myId],
        }).then(() => navigate('/chat'))
    } catch (error) {
      console.log(error);

    }

  };
const renderContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div>
            <div className="rounded-lg border p-6 shadow-md bg-white">
              <h1 className="text-2xl font-semibold pb-3">About Me</h1>
              <p>{bio}</p>
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="rounded-lg border bg-white shadow-md">
            <div className="flex flex-col space-y-1.5 p-6">
              <h1 className="text-2xl font-semibold ">Skills & Expertise</h1>
              {/* <p className="text-gray-400 text-sm">Your current Skills</p> */}
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-3 gap-8 max-sm:grid-cols-1 max-sm:gap-3">
                      {mentor.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="text-white inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-purple-600">
                            {i + 1}
                          </div>
                          <span className="text-sm">{skill} </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "reviews":
        return <div>Reviews</div>;
      default:
        break;
    }
  };

  return (
    <div>
      <div className=" fixed z-50">
        <Sidebar />
      </div>
      <div className="fixed w-full z-20 pl-[224px] max-lg:pl-0 ">
        <Search />
      </div>
      <div className={`py-6 px-4 bg-gray-50 pt-24 ml-[224px] max-lg:ml-0 ${isLoading?"h-screen":""}`}>
        <Link
          to={"/dashboard"}
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm px-4 py-2 mb-4 hover:bg-slate-200"
        >
          <i class="fa-solid fa-arrow-left"></i>Back to Dashboard
        </Link>
        {isLoading?
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

        <div className="grid grid-cols-3 mt-8 gap-8 max-lg:block">
          <div className="space-y-6">
            <div className="rounded-lg border shadow-md bg-white">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="pb-3">
                    <img
                      src={mentor.avatar ? mentor.avatar : profileImg}
                      alt=""
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">{mentor.username}</h2>
                  <p className="text-gray-400">{mentor.role}</p>
                  <p className="text-sm text-gray-400 mb-4 ">
                    {mentor.company}
                  </p>
                  <div className="flex justify-center flex-col gap-2 mb-6">
                    <div className="rounded-full border px-2.5 py-0.5 text-xs fle items-center font-meduim text-center font-semibold">
                      <i className="bx bx-group pr-1"></i>
                      78 Students
                    </div>

                    <div className="rounded-full border px-2.5 py-0.5 text-xs flex items-center font-semibold">
                      <i class="fa-regular fa-calendar mr-2"></i>Joined{" "}
                      {mentor.joined_date}
                    </div>

                  </div>

                  <div className="w-full text-white">
                    <button
                      onClick={message}
                      className=" inline-flex items-center justify-center w-full rounded-md text-sm px-4 py-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <i class="fa-regular fa-message pr-2"></i>Message
                    </button>
                    <button></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow-md border bg-white">
              <div className="space-y-1.5 p-6">
                <h2 className="text-2xl font-semibold ">Contact Information</h2>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="flex items-center">
                  <i class="fa-solid fa-location-dot text-[#64748b] mr-2"></i>
                  <span>
                    {mentor.address && mentor.address.length > 0
                      ? mentor.address[0].street
                      : ""}
                  </span>
                </div>
                <div className="flex items-center">
                  <i class="fa-solid fa-envelope text-[#64748b] mr-2"></i>
                  <span className="text-purple-600 hover:underline cursor-pointer">
                    {mentor.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <i class="fa-solid fa-globe mr-2 text-[#64748b]"></i>
                  <Link
                    to={`https://${mentor.website}`}
                    className="text-purple-600 hover:underline"
                  >
                    Personal Website
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs pl-1"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow-md border bg-white ">
              <div className="p-6">
                <div className="space-y-1.5 flex flex-col">
                  <h1 className="text-2xl font-semibold pb-3">Languages</h1>
                  <div className="flex text-xs gap-2">
                    <div className="rounded-full bg-gray-200 text-xs px-2 py-1">
                      English
                    </div>
                    <div className="rounded-full bg-gray-200 text-xs px-2 py-1">
                      Spanish
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-start-2 col-end-4 max-lg:mt-5"
            defaultValue="about"
          >
            <div className="grid grid-cols-2 bg-gray-200 p-1 rounded-md mb-6 max-sm:mb-2">
              <button
                onClick={() => setActiveTab("about")}
                className={`rounded-sm px-3 py-1.5 text-sm ${activeTab === "about" ? "bg-white" : "text-gray-500"
                  } `}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`rounded-sm px-3 py-1.5 text-sm ${activeTab === "skills" ? "bg-white" : "text-gray-500"
                  } `}
              >
                Skills
              </button>
              {/* <button
                onClick={() => setActiveTab("reviews")}
                className={`rounded-sm px-3 py-1.5 text-sm ${activeTab === "reviews" ? "bg-white" : "text-gray-500"
                  } `}
              >
                Reviews
              </button> */}
            </div>
            <div className="">{renderContent()}</div>
          </div>
        </div>
}
      </div>
    </div>
  );
}

export default MentorProfile;
