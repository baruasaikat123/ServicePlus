import React, { useEffect } from 'react'

const Contact = () => {

  useEffect(() => {
    document.title = 'Contact page'
  }, [])
  
  return (
    <div>Contact page</div>
  )
}

export default Contact