import React from 'react'
import PropTypes from 'prop-types'
import './LibraryStatus.scss'

const LibraryStatus = props => (
  <div className="library-status mt-20 border-5">
    <div className="pr-20">
      <span>
        <strong>{props.courses}</strong>
      </span>
      &nbsp;&nbsp;
      <span>Courses</span>
    </div>
    <div>
      <span>
        <strong>{props.modules}</strong>
      </span>
      &nbsp;&nbsp;
      <span>Modules</span>
    </div>
    {/* <div className='space' />
    <span className='dsl-d14 selected'>You selected:</span>
    <div className='pr-10'>
      &nbsp;&nbsp;&nbsp;
      <span>
        {props.selected.map((item, index) => (
          <strong>{item}{props.selected.length !== (index + 1) ? ',' : ''}&nbsp;</strong>
        ))}
      </span>
      &nbsp;
      <div className="close">
        <SIcon name='close-circle' size={20} />
      </div>
    </div> */}
  </div>
)

LibraryStatus.propTypes = {
  courses: PropTypes.number,
  modules: PropTypes.number,
  selected: PropTypes.array,
}

LibraryStatus.defaultProps = {
  courses: 0,
  modules: 0,
  selected: '',
}

export default LibraryStatus
