import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ManageActions from '../../../../../actions/manage'
import SectionHeader from '../../../../../components/ProjectSectionHeader'
import SectionItem from '../../../../../components/ClickableSectionItem'

class ProjectSection extends Component {
  changeCurrentProject(id) {
    this.props.changeActiveProject(id)
  }

  render() {
    const { projects, selectedProject } = this.props
    return (
      <div className="section-container ml-20 mt-20">
        <SectionHeader header={`My Projects (${Object.keys(projects).length})`} />
        {projects.map((project, index) => (
          <SectionItem
            project={project}
            onChangeCallBack={id => this.changeCurrentProject(id)}
            selectedProject={selectedProject}
          />
        ))}
      </div>
    )
  }
}

ProjectSection.propTypes = {
  selectedProject: PropTypes.string.isRequired,
  changeActiveProject: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  selectedProject: state.manage.currentproject,
})

const mapDispatchToProps = dispatch => ({
  changeActiveProject: index => dispatch(ManageActions.changeSelectedProject(index)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSection)
