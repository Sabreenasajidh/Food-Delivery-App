import React,{useEffect,useState} from 'react'
import Header from './UserHeader'
import Sidebar from './UserSidebar'
import './Userboard.css'


function Customer() {
  return (
    <div className = "pr-container">
      <Header />
      <Sidebar />
    </div>
  )
}

export default Customer