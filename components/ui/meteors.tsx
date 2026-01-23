"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 5,
  angle = 135,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  )

  useEffect(() => {
    const styles = [...new Array(number)].map(() => {
      // Randomize angle slightly for a more natural look
      const randomAngle = angle + (Math.random() * 20 - 10);
      
      // Randomly decide if it starts from the top or from the right edge
      const startsFromTop = Math.random() > 0.3;
      
      let top, left;
      if (startsFromTop) {
        top = Math.floor(Math.random() * -20) + "%";
        left = Math.floor(Math.random() * 100) + "%";
      } else {
        // Starts from the right side to fill the bottom-left area more
        top = Math.floor(Math.random() * 80) + "%";
        left = (100 + Math.floor(Math.random() * 20)) + "%";
      }

      return {
        "--angle": randomAngle + "deg",
        top,
        left,
        animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
        animationDuration:
          Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
          "s",
      };
    })
    setMeteorStyles(styles)
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle])

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        <span
          key={idx}
          style={{ 
            ...style,
            rotate: "var(--angle)"
          } as React.CSSProperties}
          className={cn(
            "animate-meteor pointer-events-none absolute size-1 rounded-full bg-amber-400 shadow-[0_0_0_1px_#fbbf2410,0_0_15px_#fbbf24]",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[60px] -translate-y-1/2 -translate-x-full bg-linear-to-r from-transparent to-amber-400" />
        </span>
      ))}
    </>
  )
}
