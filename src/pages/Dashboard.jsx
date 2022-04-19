import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/sidebar/Sidebar'
import Profile from '../components/profile/Profile'
import FavService from '../pages/favServices/FavService'

const Dashboard = () => {


  return (
    <div style={{display: 'flex'}}>
      <Sidebar />
    </div>
  )
}

export default Dashboard