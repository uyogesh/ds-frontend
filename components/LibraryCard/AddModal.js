import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, DropdownButton, MenuItem } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Icon from '../Icon'
import './LibraryCard.scss'

class AddModal extends Component {
  constructor(props) {
    super(props)
    this.state = { assignTo: 0 }
  }

  render() {
    const { name, users, startDate } = this.props
    const { assignTo } = this.state

    return (
      <div className='add-modal'>
        <p className='dsl-d12'>Course name:</p>
        <p className='dsl-b14 course'>{name}</p>
        <p className='dsl-d12 assign'>Assign to:</p>
        <div className='assign-box'>
          <Icon name='fal fa-user-plus' color='#343f4b' size={14} />
          <DropdownButton id="assignto" title={users[assignTo].profile.first_name + ' ' + users[assignTo].profile.last_name}>
            {users.map((user, index) => (
              <MenuItem key={index} eventKey={1} onClick={() => this.setState({ assignTo: index })}>{user.profile.first_name + ' ' + user.profile.last_name}</MenuItem>
            ))}
          </DropdownButton>
          <Icon name='fal fa-angle-down' color='#343f4b' size={18} />
        </div>
        <br />
        <p className='dsl-d12 due'>Due date:</p>
        <div className='date-box'>
          <Icon name='fal fa-calendar-alt' color='#343f4b' size={14} />
          <DatePicker
            selected={startDate}
            onChange={e => this.props.onDueDate(e)}
            placeholderText='Choose Due Date'
          />
          <Icon name='fal fa-angle-down' color='#343f4b' size={18} />
        </div>
        <br />
        <Button className='dsb save' onClick={() => this.props.onSave(users[assignTo].id)}>
          Save
        </Button>
      </div>
    )
  }
}

AddModal.propTypes = {
  name: PropTypes.string,
  users: PropTypes.array,
  startDate: PropTypes.any,
  onSave: PropTypes.func,
  onDueDate: PropTypes.func
}

AddModal.defaultProps = {
  name: '',
  onSave: () => { },
  onDueDate: () => { }
}

export default AddModal
