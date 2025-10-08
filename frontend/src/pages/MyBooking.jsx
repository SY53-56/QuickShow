import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../component/Loading'
import BlurCircle from '../component/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFrmat } from '../lib/DateFormat'

export default function MyBooking() {
  const currency = import.meta.env.VITE_CURRENCY
  const {booking, setBooking} = useState([])
  const {isLoading , setisLoading} = useState(true)


const getMyBooking = async()=>{
  setBooking(dummyBookingData)
  setisLoading(false)
}
useEffect(()=>{
  getMyBooking()
},[])
  return !isLoading?(
    <div className='relative px-6 md:px-16 pt-30 md:pt-40 min-h-[80vh]'>
<BlurCircle top="100px" left="100px"/>

<div>
  <BlurCircle bottom='0px' left='600px' />
</div>
<h1 className='text-lg font-semibold mb-4'>My Booking </h1>

{booking.map((item , index)=>(
  <div className='flex flex-col md:flex-row justify-between bg-primay/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl' key={index}>
  <div className='flex flex-col md:flex-row'>
  <img src={item.show.movie.poster_path} className='md:max-45 aspect-video h-auto object-cover object-bottom rounded' alt="img" />
  <div className='flex flex-col p-4'>
<p className='text-lg font-semibold'>{item.show.movie.title}</p>
<p className='text-gray-400 text-sm  '>{timeFormat(item.show.movie.runtime)}</p>
<p className='text-gray-400 text-sm  mt-auto'>{dateFrmat(item.show.showDateTime)}</p>

  </div>
  </div>



  <div className='flex flex-col md:items-end md:text-right justify-center p-4'>
<div className='flex items-center gap-4'>
  <p className='text-2xl font-semibold mb-3'>{currency} {item.amount}</p>
  {!item.isPaid && <button className='bg-primay px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>pay now</button>}
</div>
<div className='text-sm'>
<p><span>total ticket:</span> {item.bookedSeats.length}</p>
<p><span>seat number:</span> {item.bookedSeats.join(",")}</p>
</div>
  </div>
  </div>
))}
    </div>
  ):<Loading/>
}
