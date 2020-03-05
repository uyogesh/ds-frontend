import React from 'react'
import PropTypes from 'prop-types'
import GeneralDropDown from '../GeneralDropDown'
import { keys } from 'ramda'
import './ReportBody.scss'

const reportBody = props => {
  const headerKeys = keys(props.headers)
  return (
    <div className="wth100 learn-pagination mr-10 ml-10 flx flx-col">
      <div className="report-title-heading row">
        <div className="col-md-2" />
        <div className="col-md-10">
          <div className="col-md-8 flx-col mr-20">
            <div className="flx title-text-center">
              <span className="center">Task Stats</span>
            </div>
            <div className="row flx">
              {props.headers['Task Stats'].map(entry => {
                return (
                  <div className="flx-1 txt-center mr-5 pl-10">
                    <p>{entry}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-md-3 px-0 ml-20">
            <div className="flx title-text-center">
              <span className="center">Habit Stats</span>
            </div>
            <div className="flx">
              {props.headers[headerKeys[1]].map(entry => {
                return (
                  <div className="flx-1 txt-center mr-5 pl-10">
                    <p>{entry}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div />
      {/* Body */}
      {props.data.map((region, index) => {
        const reg = keys(region)[0]
        return (
          <div className={`colored-row px-0 wth100 ${(index + 2) % 2 === 0 ? 'colored' : null}`}>
            <div className="col-md-2">
              <GeneralDropDown
                label=""
                choices={[`${reg}`, 'Other Choices']}
                onChange={() => {}}
                title={`${reg}`}
                id={`${reg}`}
              />
            </div>
            <div className="col-md-10 px-0">
              <div className="col-md-8 flx mr-20 px-0">
                {keys(region[reg].Task).map(d => {
                  return (
                    <div className="flx-1 flx flx-col txt-center mr-5 pl-10">
                      <span className="center txt-center bold">
                        {region[keys(region)[0]].Task[d].number}
                      </span>
                      <p className="txt-center center mt-0">
                        {region[keys(region)[0]].Task[d].percent}
                      </p>
                    </div>
                  )
                })}
              </div>
              <div className="col-md-3 px-0 flx ml-20">
                {keys(region[keys(region)[0]].Habit).map(d => {
                  return (
                    <div className="flx-1 flx flx-col txt-center mr-5 pl-10">
                      <span className="center txt-center bold">
                        {region[keys(region)[0]].Habit[d].number}
                      </span>
                      <p className="txt-center center mt-0">
                        {region[keys(region)[0]].Habit[d].percent}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

reportBody.propTypes = {
  headers: PropTypes.array.isRequired,
}

export default reportBody
