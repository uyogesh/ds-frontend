import React from 'react'
import './SectionStatus.scss'

const style = {
  flexDirection: 'column',
}
const innerstyle = {
  'text-align': 'center',
}

const SectionStatus = props => (
  <div
    className="learn-pagination border-5 mt-2 px-20 align-items-center justify-content-between"
    style={style}
  >
    <div className="align-items-center wth100" style={innerstyle}>
      <div className="colItem">
        <p className="dsl-d12">Open</p>
        <p className="dsl-b12 bold">{props.status.open}</p>
      </div>
      <div className="colItem">
        <p className="dsl-d12">Past Due</p>
        <p className="dsl-b12 bold">{props.status.pastdeu}</p>
      </div>
      <div className="colItem">
        <p className="dsl-d12">Completed Today</p>
        <p className="dsl-b12 bold">{props.status.completed}</p>
      </div>
      <div className="colItem">
        <p className="dsl-d12">MTD On-Time</p>
        <p className="dsl-b12 bold">{props.status.mtd}</p>
      </div>
    </div>
  </div>
)

export default SectionStatus
