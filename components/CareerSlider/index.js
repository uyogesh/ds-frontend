import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Image, Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Slider from 'react-slick'
import Icon from '../Icon'
import DevActions from '../../actions/develop'
import { company } from '../../layouts/Dashboard/images'
import Input from './ActualPerformanceInput'
import RequiredHabits from './RequiredHabits'
import './CareerSlider.scss'

const prevIcon = (
  <div className="arrow left">
    <Icon name="fa fa-chevron-left" color="#343f4b" size={16} />
  </div>
)
const nextIcon = (
  <div className="arrow right">
    <Icon name="fa fa-chevron-right" color="#343f4b" size={16} />
  </div>
)

class CareerSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 0,
    }
  }

  componentDidMount() {
    const { companies, userId } = this.props
    const companyId = companies[0]
    this.props.reportsRequest(companyId, userId)
  }

  handlePageChange(e) {
    this.setState({ pageIndex: e })
  }

  render() {
    const { requirements, habits, developments } = this.props
    const { pageIndex } = this.state

    return (
      <div className="career-slider">
        <Slider
          infinite
          prevArrow={prevIcon}
          nextArrow={nextIcon}
          afterChange={e => this.handlePageChange(e)}
        >
          {this.props.programs.map((program, key) => (
            <div className="item" key={key}>
              <p className="dsl-b16 bold">{program.title}</p>
              <p className="dsl-b14">
                Started: {moment(program.created_at).format('MM/DD/YYYY')} Target: 6 months
              </p>

              <div className="mt-20">
                <div className="block">
                  <Row className="line bold">
                    <Col className="no-left" xs={6} sm={6} md={6} lg={6}>
                      <span className="dsl-b14">Performance Requirements</span>
                    </Col>
                    <Col className="text-center" xs={3} sm={3} md={3} lg={3}>
                      <span className="dsl-b14">Target</span>
                    </Col>
                    <Col className="text-center no-right" xs={3} sm={3} md={6} lg={3}>
                      <span className="dsl-b14">Actual</span>
                    </Col>
                  </Row>
                  {requirements.length > 0 &&
                    requirements[pageIndex].map((require, key) => (
                      <Row className="line" key={key}>
                        <Col className="no-left" xs={6} sm={6} md={6} lg={6}>
                          <div className="align-items-center">
                            <Icon name="fas fa-check-circle mr-10 opacity-5" size={21} />
                            <div className="l-content text-left">
                              <span className="dsl-d14 underline">
                                {require.text
                                  .replace(/%20/g, ' ')
                                  .replace(/%22/g, ' ')
                                  .replace(/%25/g, ' ')}
                              </span>
                              <br />
                              <span className="dsl-d12">Completed: 2/14/2018</span>
                            </div>
                          </div>
                        </Col>
                        <Col className="text-center" xs={3} sm={3} md={3} lg={3}>
                          <span>8</span>
                        </Col>
                        <Col className="text-center no-right" xs={3} sm={3} md={6} lg={3}>
                          <Input value={8} />
                        </Col>
                      </Row>
                    ))}
                </div>

                <div className="block">
                  <Row className="line bold">
                    <Col className="no-left" xs={6} sm={6} md={6} lg={6}>
                      <span>Required Habits</span>
                    </Col>
                    <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
                      <span>Target Completion</span>
                    </Col>
                    <Col className="text-center no-right" xs={3} sm={3} md={3} lg={3}>
                      <span>Actual Completion</span>
                    </Col>
                  </Row>
                  <RequiredHabits data={habits[pageIndex]} />
                </div>

                <div className="block">
                  <Row className="line bold">
                    <Col className="no-left" xs={6} sm={6} md={6} lg={6}>
                      <span>Development</span>
                    </Col>
                    <Col className="text-center" xs={2} sm={2} md={2} lg={2}>
                      <span>Courses</span>
                    </Col>
                    <Col className="text-center" xs={2} sm={2} md={2} lg={2}>
                      <span>Modules</span>
                    </Col>
                    <Col className="text-center" xs={2} sm={2} md={2} lg={2}>
                      <span>Complete</span>
                    </Col>
                  </Row>
                  {developments.length > 0 && (
                    <Row className="line last">
                      <Col className="no-left no-right" xs={6} sm={6} md={6} lg={6}>
                        <div className="align-items-center">
                          <Icon name="fal fa-circle mr-10 opacity-5" color="#969faa" size={21} />
                          <Image className="mr-10" width="100px" src={company} />
                          <div>
                            <span className="dsl-b14 underline">Sell 8 Units Month/Avg</span>
                            <br />
                            <span className="dsl-b14">Sell 8 Units Month/Avg</span>
                          </div>
                        </div>
                      </Col>
                      <Col className="text-center" xs={2} sm={2} md={2} lg={2}>
                        <span>{developments[pageIndex].courses}</span>
                      </Col>
                      <Col className="text-center" xs={2} sm={2} md={2} lg={2}>
                        <span>{developments[pageIndex].modules}</span>
                      </Col>
                      <Col className="text-center" xs={2} sm={2} md={2} lg={2}>
                        <span>{developments[pageIndex].complete}</span>
                      </Col>
                    </Row>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

CareerSlider.propTypes = {
  companies: PropTypes.array,
  programs: PropTypes.array,
  requirements: PropTypes.array,
  habits: PropTypes.array,
  developments: PropTypes.array,
  mapRequest: PropTypes.func,
}

CareerSlider.defaultProps = {}

const mapStateToProps = state => ({
  userId: state.app.id,
  companies: state.app.companies,
  programs: state.develop.careerPrograms,
  requirements: state.develop.careerRequirements,
  habits: state.develop.careerHabits,
  developments: state.develop.careerDevelopments,
})

const mapDispatchToProps = dispatch => ({
  reportsRequest: (companyId, userId) =>
    dispatch(DevActions.careerreportsRequest(companyId, userId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CareerSlider)
