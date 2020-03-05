import React from 'react'
import PropTypes from 'prop-types'
import { equals, range } from 'ramda'
import './DevReportDetail.scss'

const Pagination = ({ showing, page, total, onCounts, onPage }) => {
  const pageCounts = Math.ceil(total / showing)

  return (
    <div className="detail-pager">
      <span className="dsl-d12">Showing:&nbsp;&nbsp;</span>
      <a className={`dsl-d12 ${equals(showing, 5) && 'active'}`} onClick={() => onCounts(5)}>
        &nbsp;
        <strong>5</strong>
        &nbsp;
      </a>
      <span className="dsl-d12">|</span>
      <a className={`dsl-d12 ${equals(showing, 10) && 'active'}`} onClick={() => onCounts(10)}>
        &nbsp;
        <strong>10</strong>
        &nbsp;
      </a>
      <span className="dsl-d12">|</span>
      <a className={`dsl-d12 ${equals(showing, 20) && 'active'}`} onClick={() => onCounts(20)}>
        &nbsp;
        <strong>20</strong>
        &nbsp;
      </a>
      <span className="dsl-d12">|</span>
      <a className={`dsl-d12 ${equals(showing, 30) && 'active'}`} onClick={() => onCounts(30)}>
        &nbsp;
        <strong>30</strong>
        &nbsp;
      </a>
      <span className="dsl-d12">|</span>
      <a className="dsl-p12" onClick={() => onCounts(30)}>
        &nbsp;
        <strong>All</strong>
        &nbsp;
      </a>
      &nbsp;&nbsp;&nbsp;
      <span className="dsl-d12">Page:&nbsp;&nbsp;</span>
      <span className="dsl-b12">
        {range(0, pageCounts).map(index => {
          if (index < pageCounts - 1) {
            return (
              <a key={`pg-${index}`} onClick={() => onPage(index)}>
                <strong className={`dsl-d12 ${equals(page, index) && 'active'}`}>
                  {index + 1}
                </strong>
                ,&nbsp;
              </a>
            )
          } else if (index == pageCounts - 1) {
            return (
              <a key={`pg-${index}`} onClick={() => onPage(index)}>
                <strong className={`dsl-d12 ${equals(page, index) && 'active'}`}>
                  {index + 1}
                </strong>
              </a>
            )
          } else {
            return
          }
        })}
        {pageCounts * showing > total && (
          <a onClick={() => onPage(pageCounts)}>
            <strong className={`dsl-d12 ${equals(page, total) && 'active'}`}>{pageCounts}</strong>
          </a>
        )}
      </span>
    </div>
  )
}

Pagination.propTypes = {
  showing: PropTypes.number,
  page: PropTypes.number,
  total: PropTypes.number,
  onCounts: PropTypes.func,
  pnPage: PropTypes.func,
}

Pagination.defaultProps = {
  showing: 10,
  page: 0,
  total: 1,
}

export default Pagination
