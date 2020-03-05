import React, { Component } from 'react'
import SectionHeader from '../../../../../components/SectionHeader'
import ListItem from '../../../../../components/ListItem'
import HabitSectionStatus from '../../../../../components/HabitSectionStatus'

class WorkHabits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      WorkHabitss: [
        {
          header: 'Habits',
          status: {
            open: 2,
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
        {this.state.WorkHabitss.map(project => (
          <div>
            <SectionHeader header={project.header} />
            <HabitSectionStatus status={project.status} />
            {project.listItems.map(item => (
              <ListItem listItems={item} />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default WorkHabits
