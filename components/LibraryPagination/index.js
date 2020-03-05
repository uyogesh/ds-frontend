import React from 'react'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import Icon from '../Icon'
import './LibraryPagination.scss'

const LibraryPagination = props => (
  <div className="library-pagination p-20">
    <span className="dsl-d13">Show:&nbsp;&nbsp;</span>
    <a
      className={`pages ${equals(props.showing, 10) && 'active'} dsl-b14`}
      onClick={() => props.onChange(10)}
    >
      <strong>10</strong>
    </a>
    <span className="dsl-b12">|</span>
    <a
      className={`pages ${equals(props.showing, 20) && 'active'} dsl-b14`}
      onClick={() => props.onChange(20)}
    >
      <strong>20</strong>
    </a>
    <span className="dsl-b12">|</span>
    <a
      className={`pages ${equals(props.showing, 30) && 'active'} dsl-b14`}
      onClick={() => props.onChange(30)}
    >
      <strong>30</strong>
    </a>
    &nbsp;&nbsp;&nbsp;
    <span className="dsl-d13">Page:&nbsp;&nbsp;</span>
    <span className="dsl-b12">
      {[1, 2, 3, 4].map(index => {
        if (index + 1 > props.pages) {
          return
        } else {
          return (
            <span key={`current-${index}`}>
              <strong className={`current ${equals(props.current, index) && 'active'}`}>
                {index}
              </strong>
              {`,`}
            </span>
          )
        }
      })}
      {props.pages > 5 && (
        <strong className={`current ${equals(props.current, 5) && 'active'}`}>{`5 ... `}</strong>
      )}
      <strong className={`current ${equals(props.current, props.pages) && 'active'}`}>
        {props.pages}
      </strong>
    </span>
    <div className="right cursor-pointer">
      <span
        onClick={() => props.onNext()}
        className={`align-items-center ${equals(props.current, props.pages) ? 'deactivate' : ''}`}
      >
        <strong className="pr-10">NEXT</strong>
        <Icon name="fal fa-chevron-right" color="black" size={14} />
      </span>
    </div>
    <div className="right cursor-pointer pr-30">
      <span
        onClick={() => props.onPrev()}
        className={`align-items-center ${equals(props.current, 1) ? 'deactivate' : ''}`}
      >
        <Icon name="fal fa-chevron-left mr-10" color="black" size={14} />
        <strong className="pr-10">PREV</strong>
      </span>
    </div>
  </div>
)

LibraryPagination.propTypes = {
  showing: PropTypes.number,
  pages: PropTypes.number,
  current: PropTypes.number,
  onNext: PropTypes.func,
}

LibraryPagination.defaultProps = {
  showing: 10,
  pages: 0,
  current: 1,
  onNext: () => {},
}

export default LibraryPagination
