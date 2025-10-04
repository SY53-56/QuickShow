import React from 'react'
import { assets, dummyShowsData } from '../assets/assets'
import MovieCard from '../component/MovieCard'
import BlurCircle from '../component/BlurCircle'

export default function Movies() {
  return dummyShowsData.length >0?(
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
    <h1> now showing </h1>
    <BlurCircle top="150px" left="0px"/>
      <BlurCircle right="50px" bottom="50px"/>
    <div className='flex gap-8 flex-wrap sm:justify-centerjustify-center mt-5'>
{dummyShowsData.map((movie)=>(
  <MovieCard movie={movie} key={movie._id}/>
))}
    </div>
    </div>
  ):(
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-3xl font-bold text-center '>no movies available</h2>
    </div>
  )
}
