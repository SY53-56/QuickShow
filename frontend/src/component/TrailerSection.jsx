import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from "react-player"
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

export default function TrailerSection() {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px]'>
        Trailers
      </p>

      <div className='relative mt-6'>
        {/* blurred circle for style */}
        <BlurCircle top="-100px" right="-100px" />

        {/* video player */}
        <ReactPlayer
          url={currentTrailer.videoUrl}
          controls={true}
          className="mx-auto max-w-full"
          width="960px"
          height="540px"
        />
      </div>

      {/* Trailer thumbnails */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-3xl mx-auto'>
        {dummyTrailers.map((trailer, i) => (
          <div
            key={i}
            onClick={() => setCurrentTrailer(trailer)}
            className={`relative transition duration-300 transform cursor-pointer
              hover:-translate-y-1 
              ${currentTrailer.id === trailer.id ? 'ring-2 ring-primary scale-105' : 'opacity-90 hover:opacity-100'}`}
          >
            <img
              src={trailer.image}
              alt={trailer.title || "Trailer thumbnail"}
              className='rounded-lg w-full h-full object-cover brightness-75'
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className='absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12 text-white transform -translate-x-1/2 -translate-y-1/2'
            />
          </div>
        ))}
      </div>
    </div>
  )
}
