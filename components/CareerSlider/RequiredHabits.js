import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { equals, isNil } from 'ramda'
import Icon from '../Icon'
import './CareerSlider.scss'

const HabitsRow = ({ data }) => {
  if (isNil(data.tasks)) {
    return null
  }

  return (
    <div>
      {data.tasks.map((task, index) => (
        <Row key={index} className="line">
          <Col className="no-left" xs={6} sm={6} md={6} lg={6}>
            <div className="align-items-center pl-30">
              <Icon name="fas fa-check-circle mr-10 opacity-5" size={21} />
              <div className="l-content text-left">
                <span className="dsl-d14 underline">{task.task_name}</span>
              </div>
            </div>
          </Col>
          <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
            <span>70%</span>
          </Col>
          <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
            <span>{((100 * task.complete) / task.count).toFixed(2)}%</span>
          </Col>
        </Row>
      ))}
    </div>
  )
}

class RequiredHabits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dailyOpened: false,
      weeklyOpened: false,
      monthlyOpened: false,
    }
  }

  getCompletion(data) {
    let completion = 0
    if (isNil(data.tasks)) {
      return completion
    }
    data.tasks.map(task => {
      completion += task.completion
    })

    return completion
  }

  handleToggle(target) {
    if (equals(target, 'daily')) {
      this.setState({ dailyOpened: !this.state.dailyOpened })
    } else if (equals(target, 'weekly')) {
      this.setState({ weeklyOpened: !this.state.weeklyOpened })
    } else {
      this.setState({ monthlyOpened: !this.state.monthlyOpened })
    }
  }

  render() {
    const { dailyOpened, weeklyOpened, monthlyOpened } = this.state
    const { data } = this.props

    return (
      <div>
        <Row className="line cursor-pointer" onClick={() => this.handleToggle('daily')}>
          <Col className="no-left" xs={6} sm={6} md={6} lg={6}>
            <div className="align-items-center">
              <Icon name="fal fa-circle mr-10 opacity-5" color="#969faa" size={21} />
              <span className="dsl-b14">
                Daily Habit Completion (
                {!isNil(data.day) && !isNil(data.day.tasks) ? data.day.tasks.length : '0'})
              </span>
              &nbsp;&nbsp;
              <Icon
                name={`fa fa-chevron-${dailyOpened ? 'down' : 'right'}`}
                color="#343f4b"
                size={8}
              />
            </div>
          </Col>
          <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
            <span>70%</span>
          </Col>
          <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
            <span>
              {isNil(data.day) || isNil(data.day.stats)
                ? 'N/A'
                : `${((100 * data.day.stats.complete) / data.day.stats.count).toFixed(2)}%`}
            </span>
          </Col>
        </Row>
        {dailyOpened && !isNil(data.day) && <HabitsRow data={data.day} />}

        <Row className="line cursor-pointer" onClick={() => this.handleToggle('weekly')}>
          <Col className="no-left" xs={6} sm={6} md={6} lg={6}>
            <div className="align-items-center">
              <Icon name="fal fa-circle mr-10 opacity-5" color="#969faa" size={21} />
              <span className="dsl-b14">
                Weekly Habit Completion (
                {!isNil(data.week) && !isNil(data.week.tasks) ? data.week.tasks.length : '0'})
              </span>
              &nbsp;&nbsp;
              <Icon
                name={`fa fa-chevron-${weeklyOpened ? 'down' : 'right'}`}
                color="#343f4b"
                size={8}
              />
            </div>
          </Col>
          <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
            <span>70%</span>
          </Col>
          <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
            <span>
              {isNil(data.week) || isNil(data.week.stats)
                ? 'N/A'
                : `${((100 * data.week.stats.complete) / data.week.stats.count).toFixed(2)}%`}
            </span>
          </Col>
        </Row>
        {weeklyOpened && !isNil(data.week) && <HabitsRow data={data.week} />}

        <Row className="line cursor-pointer" onClick={() => this.handleToggle('monthly')}>
          <Col className="no-left" xs={6} sm={6} md={6} lg={6}>
            <div className="align-items-center">
              <Icon name="fal fa-circle mr-10 opacity-5" color="#969faa" size={21} />
              <span className="dsl-b14">Monthly Habit Completion (0)</span>
              &nbsp;&nbsp;
              <Icon
                name={`fa fa-chevron-${monthlyOpened ? 'down' : 'right'}`}
                color="#343f4b"
                size={8}
              />
            </div>
          </Col>
          <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
            <span>70%</span>
          </Col>
          <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
            <span>70%</span>
          </Col>
        </Row>
        {monthlyOpened && !isNil(data.month) && <HabitsRow data={data.month} />}
      </div>
    )
  }
}

RequiredHabits.propTypes = {
  data: PropTypes.any,
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequiredHabits)
