'use client'

import { useState } from 'react'

export function StarRating() {
  const [rating, setRating] = useState(0)


  return (
    <div>
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => {

            if ( star === rating ){
                setRating(star  -1 ) 
            }
    else if ( star < rating ){
                setRating(star  -1 ) 
            }


          else{
          setRating(star)
          }
          
            }}
            className="text-3xl transition-transform hover:scale-110"
          >
            <span className={star <= ( rating) ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          </button>
        ))}
      </div>
      
      {/* Hidden input to submit the rating */}
      <input type="hidden" name="rating" value={rating} />
      
      <p className="text-sm text-gray-600">
        {rating > 0 ? `Selected: ${rating} stars` : 'Click stars to rate (1-5)'}
      </p>
    </div>
  )
}