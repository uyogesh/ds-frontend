import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem, Button } from 'react-bootstrap'
import { equals } from 'ramda'
import Icon from '../Icon'
import { CardType, assignType } from '../../services/config'
import './LearnPagination.scss'

const LearnPagination = props => (
  <div className="learn-pagination border-5 mt-20 px-20 align-items-center justify-content-between">
    <div className="align-items-center">
      <span className="light-grey">Viewing:</span>
      <DropdownButton
        id="status"
        title={assignType[props.type].label}
        className="border-0 main-blue"
      >
        {assignType.map(type => (
          <MenuItem
            key={type.id}
            eventKey={type.id}
            active={equals(type.id, props.type)}
            onClick={() => props.change(type.id)}
          >
            {type.label}
          </MenuItem>
        ))}
      </DropdownButton>
    </div>
    <div className="align-items-center">
      <div
        onClick={() => equals(props.mode, 'list') && props.changeMode('grid')}
        className="cursor-pointer pr-5"
      >
        <Icon
          name="fas fa-th"
          color={`${equals(props.mode, 'grid') ? '#343f4b' : '#c3c7cc'}`}
          size={15}
        />
      </div>
      <div
        onClick={() => equals(props.mode, 'grid') && props.changeMode('list')}
        className="mr-10 cursor-pointer hidden-xs"
      >
        <Icon
          name="fas fa-th-list"
          color={`${equals(props.mode, 'list') ? '#343f4b' : '#c3c7cc'}`}
          size={15}
        />
      </div>
      <span className="dsl-p12">Showing:</span>
      &nbsp;&nbsp;
      <Button
        bsStyle="link"
        className={`pages ${equals(props.perpage, 10) && 'active bold'}`}
        onClick={() => props.showing(10)}
      >
        10
      </Button>
      <span>|</span>
      <Button
        bsStyle="link"
        className={`pages ${equals(props.perpage, 20) && 'active bold'}`}
        onClick={() => props.showing(20)}
      >
        20
      </Button>
      <span>|</span>
      <Button
        bsStyle="link"
        className={`pages-left ${equals(props.perpage, 30) && 'active bold'}`}
        onClick={() => props.showing(30)}
      >
        30
      </Button>
    </div>
  </div>
)

LearnPagination.propTypes = {
  type: PropTypes.number.isRequired,
  perpage: PropTypes.number,
  change: PropTypes.func.isRequired,
  showing: PropTypes.func.isRequired,
}

LearnPagination.defaultProps = {
  type: 0,
  perpage: 10,
}

export default LearnPagination
