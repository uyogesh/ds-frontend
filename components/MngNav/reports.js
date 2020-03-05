import React from 'react'
import { equals, split } from 'ramda'
import SIcon from '../SvgIcon'
import { PanelGroup, Panel, NavItem } from 'react-bootstrap'

export default class ReportNav extends React.Component {
  state = {
    active: equals(split('/', this.props.location.pathname)[2], 'report'),
    toggleState: false,
  }

  componentWillMount() {
    if (this.state.active) {
      this.setState({
        toggleState: true,
      })
    }
  }

  render() {
    const { toggleState, active } = this.state
    return (
      <NavItem className={`pages ${active ? 'selected' : ''}`}>
        <PanelGroup
          accordion
          id="report-toggle"
          defaultActiveKey={`${active ? '1' : null}`}
          role="button"
          bsClass="panel-group-cus"
          open={active}
        >
          <Panel
            bsClass="report-panel"
            eventKey="1"
            bsStyle="default"
            className="wth100"
            onSelect={expanded => {
              console.log('Called:')
              console.log(expanded)
              this.setState({ toggleState: expanded })
            }}
          >
            <div className="toggle-top-container">
              <Panel.Toggle className="toggle-top">
                <div className="down-icon-div">
                  <SIcon
                    name="down"
                    class={`center ${toggleState ? '' : 'hide-icon'}`}
                    size={10}
                    color={`${active ? '#376caf' : '#969FAA'}`}
                  />
                </div>
                {console.log(toggleState)}
                <Panel.Heading bsClass="panel-head">
                  <SIcon
                    name="reports"
                    class="center"
                    color={`${active ? '#376caf' : '#969FAA'}`}
                  />
                  <div className={`${active ? 'blue' : ''}`}>&nbsp;&nbsp;Reports</div>
                </Panel.Heading>
              </Panel.Toggle>
            </div>
            <Panel.Body
              className={`${
                equals(split('/', this.props.location.pathname)[3], 'enterprise') ? 'selected' : ''
              }`}
              collapsible
            >
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  this.props.history.push('/manage/report/enterprise')
                }}
                className="no-outline"
              >
                Enterprise Task
              </div>
            </Panel.Body>
            <Panel.Body
              className={`${
                equals(split('/', this.props.location.pathname)[3], 'group') ? 'selected' : ''
              }`}
              collapsible
            >
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  this.props.history.push('/manage/report/group')
                }}
                className="no-outline"
              >
                Group Task
              </div>
            </Panel.Body>
            <Panel.Body
              className={`${
                equals(split('/', this.props.location.pathname)[3], 'company') ? 'selected' : ''
              }`}
              collapsible
            >
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  this.props.history.push('/manage/report/company')
                }}
                className="no-outline"
              >
                Company Task
              </div>
            </Panel.Body>
            <Panel.Body
              className={`${
                equals(split('/', this.props.location.pathname)[3], 'department') ? 'selected' : ''
              }`}
              collapsible
            >
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  this.props.history.push('/manage/report/department')
                }}
                className="no-outline"
              >
                Department Task
              </div>
            </Panel.Body>
            <Panel.Body
              className={`${
                equals(split('/', this.props.location.pathname)[3], 'team') ? 'selected' : ''
              }`}
              collapsible
            >
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  this.props.history.push('/manage/report/team')
                }}
                className="no-outline"
              >
                Team Task
              </div>
            </Panel.Body>
            <Panel.Body
              className={`${
                equals(split('/', this.props.location.pathname)[3], 'individual') ? 'selected' : ''
              }`}
              collapsible
            >
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  this.props.history.push('/manage/report/individual')
                }}
                className="no-outline"
              >
                Individual Task
              </div>
            </Panel.Body>
          </Panel>
        </PanelGroup>
      </NavItem>
    )
  }
}
// componentClass="report-title flx"
