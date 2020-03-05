import React from 'react'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import Icon from '../Icon'
import { CardType } from '../../services/config'
import '../LearnFeed/LearnFeed.scss'

const LearnChildField = props => (
  <div className="fields cursor-pointer" onClick={() => props.onClick()}>
    <div className="fields-status align-items-center">
      <Icon
        size={21}
        name={`${equals(props.status, 3) ? 'fas fa-check-circle' : 'fal fa-circle'}`}
        color={`${equals(props.status, 3) ? '#376caf' : '#c3c7cc'}`}
      />
    </div>
    <div className="fields-content">
      <p className="mb-0 align-items-center light-grey">
        <Icon name={`${CardType[props.type].alias}`} color="#969faa" />
        &nbsp;&nbsp;
        {CardType[props.type].label}
      </p>
      <p className="mb-0 main-blue bold">{props.name}</p>
    </div>
  </div>
)

LearnChildField.propTypes = {
  type: PropTypes.number,
  status: PropTypes.number,
  name: PropTypes.string,
}

LearnChildField.defaultProps = {
  type: 1,
  status: 0,
  name: '',
}

export default LearnChildField
