import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../component/Loading'
import { ArrowRightIcon, Clock11Icon } from 'lucide-react'
import isoTimeFormate from '../lib/isoTimeFormat'
import BlurCircle from '../component/BlurCircle'
import { toast } from 'react-hot-toast'

export default function SeatLayouts() {
  const groupRows = [["a", "b"], ["c", "d"], ["e", "f"], ["g", "h"], ["i", "j"]]
  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const navigate = useNavigate()

  async function getShow() {
    const foundShow = dummyShowsData.find((show) => show._id === id)
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData
      })
    }
  }

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select a time first")
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 4) {
      return toast("You can only select up to 4 seats")
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    )
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`
          const isSelected = selectedSeats.includes(seatId)
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              aria-pressed={isSelected}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer transition
                ${isSelected ? "bg-primary text-white" : "hover:bg-primary/10"}
              `}
            >
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  useEffect(() => {
    getShow()
  }, [])

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 md:pt-20">
      {/* available timing */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available timing</p>
        <div className="mt-5 space-y-1">
          {show.dateTime?.[date]?.map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex flex-col items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition 
                ${selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"}
              `}
            >
              <Clock11Icon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormate(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* seats layout */}
      <div className="relative flex-1 flex items-center flex-col max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="0" right="0" />

        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>


  </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, ind) => (
              <div key={ind}>
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
        </div>
          <button onClick={()=>navigate("/my-booking")} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>Procees t o checkout
        <ArrowRightIcon  strokeWidth={3}/>
      </button>
      </div>
    
    </div>
  ) : (
    <Loading />
  )
}
