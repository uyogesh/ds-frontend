import React, { Component } from 'react'
import SectionHeader from '../../../../../components/SectionHeader'
import ListItem from '../../../../../components/ListItem'
import DetailSectionStatus from '../../../../../components/DetailSectionStatus'

class WorkPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      WorkPlans: [
        {
          header: 'Daily Plan for: 2/2/12',
          status: {
            open: 2,
            pastdeu: 0,
            completed: 0,
            mtd: '33%',
          },
          listItems: [
            {
              check: 'checked',
              name: 'Daily',
              description: 'check in with Manager',
              due_date: '1534391999',
              comments: null,
              completed_at: 'completed',
            },
            {
              check: 'unchecked',
              name: 'Daily',
              description: 'check in with Manager',
              due_date: '1503446400',
              comments: 2,
              completed_at: 'null',
            },
            {
              check: 'unchecked',
              name: 'Daily',
              description: 'check in with Manager',
              due_date: '1534291200',
              comments: null,
              completed_at: 'completed',
            },
          ],
        },
      ],
    }
  }

  render() {
    return (
      <div>
        {this.state.WorkPlans.map(project => (
          <div>
            <SectionHeader header={project.header} />
            <DetailSectionStatus status={project.status} />
            {project.listItems.map(item => (
              <ListItem listItems={item} />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default WorkPlan
