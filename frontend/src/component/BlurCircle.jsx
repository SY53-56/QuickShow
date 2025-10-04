import React from 'react'

export default function BlurCircle({
  top = "auto",
  left = "auto",
  bottom = "auto",
  right = "auto"
}) {
  return (
    <div
      className="absolute -z-50 h-58 w-58 aspect-square rounded-full bg-primary/30 blur-3xl"
      style={{ top, left, bottom, right }}
    />
  )
}

