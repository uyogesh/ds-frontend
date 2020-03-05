import React from 'react'
import './HabitSectionStatus.scss'

const style = {
  flexDirection: 'column',
}

const innerstyle = {
  'text-align': 'center',
}

const HabitSectionStatus = props => (
  <div
    className="learn-pagination border-5 mt-2 px-20 align-items-center justify-content-between"
    style={style}
  >
    <div className="align-items-center wth100" style={innerstyle}>
      <div className="colItem col-xs-4">
        <p className="dsl-d12">Open</p>
        <p className="dsl-b12 bold">{props.status.open}</p>
      </div>
      <div className="colItem col-xs-4">
        <p className="dsl-d12">Completed Today</p>
        <p className="dsl-b12 bold">{props.status.completed}</p>
      </div>
      <div className="colItem col-xs-4">
        <p className="dsl-d12">MTD On-Time</p>
        <p className="dsl-b12 bold">{props.status.mtd}</p>
      </div>
    </div>
  </div>
)

export default HabitSectionStatus
