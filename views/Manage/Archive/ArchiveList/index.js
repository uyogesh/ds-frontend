import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import { Button, Grid, Row, Col, Modal } from 'react-bootstrap'
import Status from '../../../../components/ManageArchiveStatus'
import TaskArchive from '../../../../components/TaskArchive'
import Pagination from '../../../../components/LibraryPagination'
import DevActions from '../../../../actions/develop'

class ArchiveList extends Component {
    componentWillMount () {
        this.handleArchives()
      }
    
      handleArchives () {
        const { userId, per, page } = this.props
        this.props.archiveRequest(userId, per, page)
      }
    
    constructor(props) {
        super(props);
        this.state = {
            archivelists: [
                {
                    listItems: [
                        {
                            check: "checked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1534391999",
                            comments: null,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1534291200",
                            comments: null,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                        {
                            check: "unchecked",
                            name: "Daily",
                            description: "check in with Manager",
                            due_date: "1503446400",
                            comments: 2,
                            completed_at:"completed"
                        },
                    ]
                },

            ]
        };
    }
  
  render() {
    const { feeds, per, page, totalPages, perUpdate, pageUpdate } = this.props
    return (
      <div>
        <Row className="mx-0">
        <Col xs={12} ><Status/></Col>
        <Col xs={12} >
          {this.state.archivelists.map((project) => (
                  <div>
                      {project.listItems.map((item) => (
                      <TaskArchive archiveItems={item} />
                      ))}
                  </div>
          ))}
        </Col>
        <Col xs={12}>
        <Pagination
              showing={per}
              current={page + 1}
              pages={totalPages}
              onPrev={() => {
                if (page < 1) {
                  return
                }
                pageUpdate(page - 1)
                this.handleArchives()
              }}
              onNext={() => {
                if (equals(totalPages, page + 1)) {
                  return
                }
                pageUpdate(page + 1)
                this.handleArchives()
              }}
              onChange={PerPage => {
                perUpdate(PerPage)
                this.handleArchives()
              }}
            />
            </Col>
          
          
        </Row>
      </div>
    );
  }
}
ArchiveList.propTypes = {
    userId: PropTypes.number,
    feeds: PropTypes.array,
    totalPages: PropTypes.number,
    page: PropTypes.number,
    per: PropTypes.number,
    archiveRequest: PropTypes.func,
    pageUpdate: PropTypes.func,
    perUpdate: PropTypes.func
  }
  
  const mapStateToProps = state => ({
    userId: state.app.id,
    feeds: state.develop.archivedFeeds,
    totalPages: Math.ceil(state.develop.archiveTotal / 10),
    page: state.develop.archiveCurPage,
    per: state.develop.archivePerPage
  })
  
  const mapDispatchToProps = dispatch => ({
    archiveRequest: (userId, perPage, page) =>
      dispatch(DevActions.archivefetchRequest(userId, perPage, page)),
    pageUpdate: e => dispatch(DevActions.acurpageUpdate(e)),
    perUpdate: e => dispatch(DevActions.aperpageUpdate(e))
  })
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ArchiveList)
