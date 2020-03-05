import React, { Component } from 'react'
import SectionHeader from '../../../../../components/SectionHeader'
import TrainingList from '../../../../../components/TrainingList'

class WorkTraining extends Component {
  constructor(props) {
    super(props)
    this.state = {
      WorkTrainings: [
        {
          header: 'Marketing',
          listItems: [
            {
              description: 'Modern Phone Process',
              image: 'company.png',
              due: '2/4',
              modules: '2',
              completed: '3',
              pastdue: '4',
              completed_at: 'completed',
            },
            {
              description: 'Welcome Process',
              image: 'company.png',
              due: '2/6',
              modules: '2',
              completed: '3',
              pastdue: '4',
              completed_at: 'incompleted',
            },
            {
              description: 'Hello Process',
              image: 'company.png',
              due: '6/4',
              modules: '2',
              completed: '3',
              pastdue: '4',
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
        {this.state.WorkTrainings.map(project => (
          <div>
            <SectionHeader header={project.header} />
            {project.listItems.map(item => (
              <TrainingList listItems={item} />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default WorkTraining
