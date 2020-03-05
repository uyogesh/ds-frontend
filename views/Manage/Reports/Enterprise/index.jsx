import React from 'react'
import { split } from 'ramda'
import ReportHeader from '../../../../components/ReportHeader'
import ReportTitle from '../../../../components/ReportTitle'
import ReportBody from '../../../../components/ReportBody'

export default class EnterpriseReport extends React.Component {
  state = {
    headers: {
      'Task Stats': [
        'MTD onTime Completion',
        'Currently Open',
        'Currently Past Due',
        'Completed ToDate',
        'Completed OnTime',
        'Completed Late',
        'Ave Completed Per Day',
        'Ave Time To Complete',
      ],
      'Habit Stats': [
        'Current Daily Habit Completion',
        'Currently Weekly Habit Completion',
        'Currently Monthly Habit Completion',
      ],
    },
    data: [
      {
        'Western Region': {
          Task: {
            mtd: {
              number: '20',
              percent: '100%',
            },
            co: {
              number: '7',
              percent: '100%',
            },
            cpd: {
              number: '20',
              percent: '100%',
            },
            ctd: {
              number: '20',
              percent: '100%',
            },
            cot: {
              number: '20',
              percent: '100%',
            },
            cl: {
              number: '20',
              percent: '100%',
            },
            acpd: {
              number: '20',
              percent: '100%',
            },
            atoc: {
              number: '20',
              percent: '100%',
            },
          },
          Habit: {
            cdhc: {
              number: '2',
              percent: '100%',
            },
            cwhc: {
              number: '2',
              percent: '100%',
            },
            cmhc: {
              number: '2',
              percent: '100%',
            },
          },
        },
      },
      {
        'Northern Region': {
          Task: {
            mtd: {
              number: '20',
              percent: '100%',
            },
            co: {
              number: '7',
              percent: '100%',
            },
            cpd: {
              number: '20',
              percent: '100%',
            },
            ctd: {
              number: '20',
              percent: '100%',
            },
            cot: {
              number: '20',
              percent: '100%',
            },
            cl: {
              number: '20',
              percent: '100%',
            },
            acpd: {
              number: '20',
              percent: '100%',
            },
            atoc: {
              number: '20',
              percent: '100%',
            },
          },
          Habit: {
            cdhc: {
              number: '2',
              percent: '100%',
            },
            cwhc: {
              number: '2',
              percent: '100%',
            },
            cmhc: {
              number: '2',
              percent: '100%',
            },
          },
        },
      },
      {
        'Eastern Region': {
          Task: {
            mtd: {
              number: '20',
              percent: '100%',
            },
            co: {
              number: '7',
              percent: '100%',
            },
            cpd: {
              number: '20',
              percent: '100%',
            },
            ctd: {
              number: '20',
              percent: '100%',
            },
            cot: {
              number: '20',
              percent: '100%',
            },
            cl: {
              number: '20',
              percent: '100%',
            },
            acpd: {
              number: '20',
              percent: '100%',
            },
            atoc: {
              number: '20',
              percent: '100%',
            },
          },
          Habit: {
            cdhc: {
              number: '2',
              percent: '100%',
            },
            cwhc: {
              number: '2',
              percent: '100%',
            },
            cmhc: {
              number: '2',
              percent: '100%',
            },
          },
        },
      },
      {
        'Southern Region': {
          Task: {
            mtd: {
              number: '20',
              percent: '100%',
            },
            co: {
              number: '7',
              percent: '100%',
            },
            cpd: {
              number: '20',
              percent: '100%',
            },
            ctd: {
              number: '20',
              percent: '100%',
            },
            cot: {
              number: '20',
              percent: '100%',
            },
            cl: {
              number: '20',
              percent: '100%',
            },
            acpd: {
              number: '20',
              percent: '100%',
            },
            atoc: {
              number: '20',
              percent: '100%',
            },
          },
          Habit: {
            cdhc: {
              number: '2',
              percent: '100%',
            },
            cwhc: {
              number: '2',
              percent: '100%',
            },
            cmhc: {
              number: '2',
              percent: '100%',
            },
          },
        },
      },
    ],
    pageChoices: {
      enterprise: 'Enterprise Task Report',
      group: 'Group Task Report',
      company: 'Company Task Report',
      department: 'Department Task Report',
      team: 'Team Task Report',
      individual: 'Individual Task Report',
    },
  }

  render() {
    const { location } = this.props.history
    const currentPage = split('/', location.pathname)[3]
    return (
      <div className="report-container">
        <ReportHeader
          choices={Object.values(this.state.pageChoices)}
          id="report-header"
          title={this.state.pageChoices[currentPage]}
          onChange={() => {}}
        />
        <ReportTitle />
        <ReportBody headers={this.state.headers} data={this.state.data} />
      </div>
    )
  }
}
