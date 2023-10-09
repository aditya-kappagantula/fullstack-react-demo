import React from 'react'
import './styles.scss'

interface TitleContainerProps {
  title: string,
  className?: string,
  children: React.ReactNode
}
const Configuration: React.FC<TitleContainerProps> = ({ title, className, children }) => {
  return (
    <div className="title-container column full-width">
      <div className="title">{title}</div>
      <div className="content-container row">
        <div className={`content row full-width ${className}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Configuration
