import React, { useState } from 'react';
import BlurCircle from './BlurCircle';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DateSelect({ dateTime = {}, id }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  // Handle "Book Now" click
  const handleBookNow = () => {
    if (!selectedDate) {
        return toast("please select a date")

    }
    navigate(`/movies/${id}/${selectedDate}`);
    scrollTo(0, 0);
  };

  // Convert dateTime object keys safely
  const dates = Object.keys(dateTime || {});

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary border border-primary/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0" />

        <div className="flex-1">
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-4 text-sm mt-5">
            <ChevronLeft width={28} className="cursor-pointer opacity-50" />
            <div className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-2">
              {dates.length === 0 ? (
                <p className="text-white">No dates available</p>
              ) : (
                dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex flex-col items-center justify-between h-14 w-14 rounded cursor-pointer border transition-colors
                      ${selectedDate === date ? 'bg-primary-dull text-white' : 'bg-primary text-white border-white/20'}`}
                  >
                    <span>{new Date(date).getDate()}</span>
                    <span>
                      {new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                      })}
                    </span>
                  </button>
                ))
              )}
            </div>
            <ChevronRight width={28} className="cursor-pointer opacity-50" />
          </div>
        </div>

        <button
          onClick={handleBookNow}
          className="bg-primary-dull text-white px-8 py-2 mt-6 rounded  transition-all cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}


