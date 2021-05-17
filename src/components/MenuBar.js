import React, { useEffect, useState } from 'react'
import format from 'date-fns/format'

function MenuItem({ children }) {
  return (
    <div className="inline-flex flex-row space-x-1 hover:bg-white hover:bg-opacity-50 rounded p-1">
      {children}
    </div>
  )
}

export default function MenuBar({
  title,
  showControlCenter,
  setShowControlCenter
}) {
  const [ date, setDate ] = useState(new Date())
  useEffect(() => {

  })

  return (
    <div></div>
  )
}

