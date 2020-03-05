import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { equals } from 'ramda'
import DevActions from '../../../actions/develop'
import Profile from '../../../components/LearnProfile'
import Status from '../../../components/ArchiveStatus'
import Card from '../../../components/ArchiveCard'
import Pagination from '../../../components/LibraryPagination'
import './Archive.scss'

class Archive extends Component {
  componentWillMount() {
    this.handleArchives()
  }

  handleArchives() {
    const { userId, per, page } = this.props
    this.props.archiveRequest(userId, per, page)
  }

  render() {
    const { feeds, per, page, totalPages, perUpdate, pageUpdate } = this.props

    return (
      <div className="dev-archive">
        <Row className="mx-0">
          {/* <Col xs={12} sm={5} md={4} lg={3} className='px-0 mt-20'>
            <Profile />
          </Col>
          <Col xs={12} md={8} lg={9}> */}
          <Col xs={12}>
            <Status />
            {feeds.map((feed, key) => (
              <Card data={feed} key={key} />
            ))}

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
    )
  }
}

Archive.propTypes = {
  userId: PropTypes.number,
  feeds: PropTypes.array,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  per: PropTypes.number,
  archiveRequest: PropTypes.func,
  pageUpdate: PropTypes.func,
  perUpdate: PropTypes.func,
}

const mapStateToProps = state => ({
  userId: state.app.id,
  feeds: state.develop.archivedFeeds,
  totalPages: Math.ceil(state.develop.archiveTotal / 10),
  page: state.develop.archiveCurPage,
  per: state.develop.archivePerPage,
})

const mapDispatchToProps = dispatch => ({
  archiveRequest: (userId, perPage, page) =>
    dispatch(DevActions.archivefetchRequest(userId, perPage, page)),
  pageUpdate: e => dispatch(DevActions.acurpageUpdate(e)),
  perUpdate: e => dispatch(DevActions.aperpageUpdate(e)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive)
