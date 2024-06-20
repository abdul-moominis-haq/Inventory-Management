import React from 'react'
import style from '../styles/Card.module.css'

function Card(props) {
  return (
    <div className={style.card}>
      {props.children}
    </div>
  )
}

export default Card
