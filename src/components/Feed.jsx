import React,{useContext, useEffect} from 'react'
import { Context } from '../context/ContextApi'
import LeftNav from './LeftNav'
import VideoCard from './VideoCard'

const Feed = () => {
  const {loading, searchResults} = useContext(Context)

  useEffect(()=>{
    document.getElementById('root').classList.remove('custom-h')//removing styles form index.css
  },[])

  return (
    //h-[clac(100%-56)] here the header is 56px so we are subttracting that height
    <div className='flex flex-row h-[calc(100%-56px)]'>
      {/* sidebar menu */}
      <LeftNav/>


      {/* videos to be displayed on the homepage */}
      {/* since width of the LeftNav  component is 240px we are subtracting 240px form the total width*/}
      <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5'>
          {
            // searchResults array get filled when we make search on the search bar and click on the sibebar options= leftNav, also automatticaly there on page load
            !loading && searchResults && 
            searchResults.map(item=>{
              if (item.type !== 'video') return false;
              return (
                <VideoCard
                // ? = option chaining to prevent app from crashing
                  key={item?.video?.videoId} // .video.videoId is the video and videoId recieved from rapid api
                  video={item?.video} // .video is the video recieved from rapid api
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Feed
