import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SectionHeader from '../../../../../components/ProjectSectionHeader'
import SectionStatus from '../../../../../components/ProjectSectionStatus'
import ListItem from '../../../../../components/ProjectsListItem'

const TASK_TYPE_MINE = 1
const TASK_TYPE_OTHERS = 2

class ProjectDetail extends Component {
  render() {
    const { task } = this.props
    return (
      <div className="project-header-container mt-20">
        <div className="flx mr-20">
          <div className="flx-1">
            <div className="ml-20">
              <SectionHeader header="My Tasks" />
              <SectionStatus status={task.my_stats} index={0} />
              <ListItem listItems={task.my_tasks} taskType={TASK_TYPE_MINE} />
            </div>
          </div>
          <div className="flx-1">
            <div className="ml-20">
              <SectionHeader header="Others Tasks" />
              <SectionStatus status={task.others_stats} index={1} />
              <ListItem listItems={task.others_tasks} taskType={TASK_TYPE_OTHERS} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProjectDetail.propTypes = {
  task: PropTypes.object.isRequired,
}

export default ProjectDetail
