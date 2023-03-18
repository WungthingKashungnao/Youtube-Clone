import React,{useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom' // useparams is to get the id from the url, the last string of the url
import ReactPlayer from 'react-player'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {AiOutlineLike} from 'react-icons/ai'
import { abbreviateNumber } from 'js-abbreviation-number'

import {fetchDataFromApi} from '../utils/api'
import { Context } from '../context/ContextApi'
import SuggestionVideoCard from './SuggestionVideoCard'

const VideoDetails = () => {
  const [video, setVideo] = useState() //state to handle the video coming from the api
  const [relatedVideos, setRelatedVideos] = useState()//state to handle related the video coming from the api
  const {id} = useParams() // the id of the video, destucturing params and setting it to id
  const {setLoading} = useContext(Context)

  useEffect(()=>{
    document.getElementById('root').classList.add('custom-h')// making changes in the index.css file, that is making height auto

    fetchVideoDetails()
    fetchRelatedVideos()
  },[id])

  //custom function for video detatils,  called  whenenver id changes
  const fetchVideoDetails = ()=>{
    setLoading(true)
    //async fucntion from utils/api
    // the url fetchDataFromApi is calling, is given in the rapid api, the details about video
    fetchDataFromApi(`video/details/?id=${id}`).then(res=>{
      console.log(res)
      setVideo(res)
      setLoading(false);
    })
  }


  //custom function for related video ,  called  whenenver id changes
  const fetchRelatedVideos = ()=>{
    setLoading(true)
    //async fucntion from utils/api
    // the url fetchDataFromApi is calling, is given in the rapid api, the related-contents about video
    fetchDataFromApi(`video/related-contents/?id=${id}`).then(res=>{
      console.log(res)
      setRelatedVideos(res)
      setLoading(false);
    })
  }

  return (
    <div className='flex justify-center flex-row h-[calc(100%-56px)] bg-black '>
      <div className='w-full max-w-[1280px] flex flex-col lg:flex-row'>
        {/* video information start */}
        <div className='flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg;py-6 overflow-y-auto'>
          {/* div for the react ployer start */}
          <div className='h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width='100%'
              height='100%'
              style={{backgroundColor: '#000000'}}
            />
          </div>
          {/* div for the react ployer end */}
          
          <div className='text-white font-bold text-sm md:text-xl mt-4 line-clamp-2'>
            {/* video data recieved when useffect was rendred when the id was updated */}
            {video?.title} 
          </div>
          <div className='flex justify-between flex-col md:flex-row mt-4'>
            <div className='flex'>
              <div className='flex items-start'>
                <div className='flex h-11 w-11 rounded-full overflow-hidden'>
                    <img src={video?.author?.avatar[0]?.url} alt="channel owner image" />
                </div>
              </div>

              <div className='flex flex-col ml-3'>
                <div className='text-white text-md font-semibold flex items-center'>
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === 'VERIFIED_CHANNEL' && (
                    <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1'/>
                  )}
                </div>
                <div className='text-white/[0.5] text-[12px] ml-1'>
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>

            <div className='flex text-white mt-4 md:mt-0'>
             <div className='flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]'>
               <AiOutlineLike
                className='text-xl text-white mr-2'/>
                <span>{`${abbreviateNumber(video?.stats?.likes,2)} Likes`}</span>
             </div>

             <div className='flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4'>
                <span>{`${abbreviateNumber(video?.stats?.views,2)} Views`}</span>
             </div>

            </div>
          </div>
        </div>
        {/* video information end */}
        
        {/* suggested videos on the right side start */}
        <div className='flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]'>
          {
            relatedVideos?.contents?.map((item, index)=>{
              if(item?.type !== 'video') return false
              return(
                <SuggestionVideoCard
                key={index}
                video={item?.video}
                />
              ) 
            })
          }
        </div>
        {/* suggested videos on the right side end */}
      </div>
    </div>
  )
}

export default VideoDetails
