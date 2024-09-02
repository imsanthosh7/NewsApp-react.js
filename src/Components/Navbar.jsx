import React, { useState, useEffect } from 'react'
import { TiWeatherPartlySunny } from "react-icons/ti";
import logo from '../assets/NEWSLETTER.png'

function Navbar({ getGetSelectTopic, searchNews }) {

  const [activeTopic, setActiveTopic] = useState('Home');
  const [currentTime, setCurrentTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const topics = ['Politics', 'Science & Tech', 'Health', 'Sports', 'Climate', 'Business'];



  const handleClickTopic = (topic) => {
    getGetSelectTopic(topic);
    setActiveTopic(topic);
  }


  // get currentTime 
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);


  // handelSearch

  const handleSearch = () => {
    searchTerm.trim() === '' ? "" : searchNews(searchTerm);
  }


  return (
    <>
      <div className='w-full'>
        <nav className='flex flex-row justify-between items-center md:py-7 py-4 md:px-5 px-3 bg-black'>
          <div>
            <a href=""><img className='md:w-[200px] w-[115px]' src={logo} alt="logo" /></a>
          </div>
          <div className='flex flex-row md:space-x-2 space-x-1'>
            <input
              type="text"
              placeholder='Search for headlines'
              onChange={(e) => setSearchTerm(e.target.value)}
              className='md:w-72 w-40 md:text-[15px] text-[11px]  md:p-2 p-1 outline'
            />
            <button
              onClick={handleSearch}
              className='bg-red-600 md:text-[16px] text-[11px] px-1 md:px-2 font-semibold text-white hover:bg-red-700 duration-150'>
              Search
            </button>
          </div>
        </nav>
      </div>
      <div className=' bg-bg-gray md:h-16 h-9  flex justify-center md:justify-between px-1 md:px-10 items-center sticky top-0 z-20 drop-shadow-xl shadow-gray-50'>
        <div >
          <ul className='flex flex-row space-x-1 md:space-x-2 text-white font-semibold '>
            {
              topics.map((topic, id) => (
                <a key={id} href="#">
                  <li onClick={() => handleClickTopic(topic)} className={`p-1 md:p-5 text-[11px] md:text-[15px] cursor-pointer ${activeTopic === topic ? "bg-red-600" : "hover:bg-red-600"}`}>{topic}</li>
                </a>
              ))
            }
          </ul>
        </div>
        <div>
          <div className='md:flex flex-row w-32 space-x-3 md:visible hidden'>
            <h2 className='text-white text-sm'>{currentTime}</h2>
            <h2 className='flex flex-row text-white'>
              <span><TiWeatherPartlySunny /></span>
              24 °C
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar