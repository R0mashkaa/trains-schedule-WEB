import React from 'react'
import { icons } from './icons'

const Icons = ({ name, size = 24, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {icons[name] || null}
    </svg>
  )
}

export default Icons
