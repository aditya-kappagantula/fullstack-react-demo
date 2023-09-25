import React from 'react'
import './styles.scss'

const Header: React.FC<{title: string}> = ({ title }) => {
  return (
    <div className="header row center-v">
      <img className="logo" src="/assets/images/logo.png" alt="logo" />
      <span className="title">{title}</span>
    </div>
  )
}

export default Header
