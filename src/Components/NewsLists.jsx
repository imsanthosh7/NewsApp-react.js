import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { SlCalender } from "react-icons/sl";
import { FaCircleArrowRight } from "react-icons/fa6";
import cover_img from '../assets/coverImg.jpg'
import { FaAngleDown } from "react-icons/fa";
import Loader from './Loader';





function NewsLists() {

    let APIKEY = '4f857569fdbe42879b62c31c727a79b8';

    const [selectTopic, setSelectTopic] = useState('india');
    const [news, setNews] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);


    // featch news data 
    const fetchNews = async (topic) => {

        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${APIKEY}`);
            setNews(response.data.articles);
        } catch (err) {
            console.log(`something worng ${err}`);

        }

    }


    useEffect(() => {

        fetchNews(selectTopic);

    }, [selectTopic]);


    const truncateText = (text, maxLength) => {
        return text && text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };


    // showmoreitem 
    const showMoreItem = () => {
        setVisibleCount((count) => count + 15);
    }

    // setSearchterm
    const searchNews = (searchTerm) => {
        setSelectTopic(searchTerm);
    };

    return (
        <>
            <Navbar getGetSelectTopic={setSelectTopic} searchNews={searchNews} />
            <div>
                {/* <TrendingNews/> */}
            </div>
            <div>
                <div>
                    <div className={`w-full md:px-28 px-6 md:py-8 py-4 ${news.length === 0 ? "hidden" : ""}`}>
                        {
                            selectTopic === 'india' ? (<h1 className='text-2xl font-semibold'>Trending
                                <span className='text-red-600'> News</span>
                            </h1>) : (
                                <h1 className='text-2xl font-semibold'>{selectTopic}
                                    <span className='text-red-600'> News</span>
                                </h1>
                            )

                        }
                    </div>
                    <div className='flex flex-row flex-wrap justify-center gap-x-6 gap-y-4 my-3'>
                        {news.length > 0 ? (
                            news.slice(0, visibleCount).map((data, id) => {
                                const dateTime = data.publishedAt;
                                const sliceDate = dateTime ? dateTime.slice(0, 10) : 'Unknown date';
                                const truncatedTitle = truncateText(data.title, 50);
                                const truncatedDescription = truncateText(data.description, 100);

                                return (
                                    <div key={id} className='md:w-80 w-80 bg-gray-50 p-4 drop-shadow-sm shadow-gray-50 '>
                                        <div>
                                            <img
                                                className='hover:scale-105 duration-150 cursor-pointer w-[350px] h-[200px] object-cover'
                                                src={data.urlToImage === null ? cover_img : data.urlToImage}
                                                alt={data.title}
                                            />
                                            <div className='mt-3'>
                                                <h3 className='flex space-x-2 items-center text-gray-500'>
                                                    <SlCalender />
                                                    <span className='text-sm'>{sliceDate}</span>
                                                </h3>
                                            </div>
                                            <h1 className='text-red-600 font-semibold my-2'>{truncatedTitle}</h1>
                                            <p className='text-sm text-gray-500'>{truncatedDescription}</p>
                                            <div className='my-2'>
                                                {
                                                    data.author === null ? "" :
                                                        <h3 className='text-[13px] font-semibold text-gray-800'>
                                                            Author :
                                                            <span className='text-gray-500 font-normal italic ml-1'>
                                                                {data.author}
                                                            </span>
                                                        </h3>
                                                }
                                            </div>
                                        </div>
                                        <div className='flex justify-end text-center mt-2'>
                                            <div className='bg-red-600 py-2 px-2 flex flex-row items-center space-x-2 cursor-pointer hover:bg-red-700 duration-150 ease-in-out'>
                                                <a className='text-white text-[13px] font-semibold' href={data.url} target='_blank' rel='noopener noreferrer'>Read more</a>
                                                <span className='w-[13px] text-white'><FaCircleArrowRight /></span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className='md:h-[70vh] h-[80vh] flex justify-center items-center'>
                                <Loader />
                            </div>
                        )}
                    </div>

                    {/* show more btn  */}
                    {
                        visibleCount < news.length && (
                            <div div className='flex justify-center my-10'>
                                <button className='px-2 py-1 flex flex-row gap-1 items-center bg-red-600 text-white font-medium hover:bg-red-700 duration-150 ease-in-out'
                                    onClick={showMoreItem}
                                >
                                    View More
                                    <span className='mt-1'><FaAngleDown /></span>
                                </button>
                            </div>
                        )
                    }

                </div>
            </div >
        </>
    )
}

export default NewsLists


