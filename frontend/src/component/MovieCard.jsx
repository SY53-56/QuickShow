import { StarIcon } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormate from '../lib/timeFormat';

export default function MovieCard({movie}) {
const navigate= useNavigate()
  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xlhover:-translate-y-1 transition duration-300 w-66  '>
  <img onClick={()=>{navigate(`/movie/:${movie._id}`); scrollTo(0,0)}} src={movie.backdrop_path} alt="" className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer' />
  <p className='font-semibold mt-2 truncate'>{movie.title}</p>
  <p className='text-sm text-gray-400 mt-2'>{new Date(movie.release_date).getFullYear()}. {movie.genres.slice(0,2).map(genre=>genre.name).join(" | ")} .{timeFormate(movie.runtime)}</p>
  <div className='flex items-center justify-between mt-4 pb-3'>
    <button onClick={()=>{navigate(`/movie/:${movie._id}`); scrollTo(0,0)}} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull 
            transition rounded-full font-medium cursor-pointer'>
buy ticket
    </button>
    <p className='flex gap-2 items-center'><StarIcon className='w-4 h-4 text-primary fill-primar'/>
    {movie.vote_average.toFixed(1)}
    </p>
  </div>
    </div>
  )
}
