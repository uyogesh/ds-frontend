import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Media } from 'react-bootstrap'
import { isNil, equals } from 'ramda'
import OutsideClickHandler from 'react-outside-click-handler'
import Icon from '../Icon'
import { company } from '../../layouts/Dashboard/images'
import AddModal from './AddModal'
import './LibraryCard.scss'

class LibraryCard extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpened: false, dueDate: null }
  }

  handleToggle() {
    const { isOpened } = this.state
    this.setState({ isOpened: !isOpened })
  }

  handleClose() {
    this.setState({ isOpened: false })
  }

  handleDate(date) {
    this.setState({ dueDate: date })
  }

  render() {
    const { isOpened, dueDate } = this.state

    return (
      <OutsideClickHandler onOutsideClick={() => this.handleClose()}>
        <div className="library-card border-5">
          <div className="lib-content" onClick={() => this.props.onClick()}>
            <Media>
              <Media.Left>
                <Image
                  className="small"
                  src={
                    isNil(this.props.image) || equals(this.props.image, '')
                      ? company
                      : this.props.image
                  }
                />
              </Media.Left>
              <Media.Body>
                <Media.Heading className="dsl-b14">{this.props.name}</Media.Heading>
                <p className="dsl-d12">Modules: {this.props.modules}</p>
                <p className="dsl-d14">{this.props.description}</p>
              </Media.Body>
            </Media>
          </div>
          <div className={`add ${isOpened ? 'active' : ''}`} onClick={() => this.handleToggle()}>
            <Icon name="fal fa-plus" size={30} />
            <span>Add</span>
          </div>
          {isOpened && (
            <AddModal
              name={this.props.name}
              users={this.props.users}
              startDate={dueDate}
              onDueDate={e => this.handleDate(e)}
              onSave={userId => this.props.onCreate(userId)}
            />
          )}
        </div>
      </OutsideClickHandler>
    )
  }
}

LibraryCard.propTypes = {
  modules: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.any,
  users: PropTypes.array,
  onCreate: PropTypes.func,
}

LibraryCard.defaultProps = {
  modules: 1,
  name: '',
  description: '',
  users: [],
  onCreate: () => {},
}

export default LibraryCard
