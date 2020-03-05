import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { drop, equals } from 'ramda';
import DevActions from '../../../actions/develop';
import Pagination from '../../../components/DevReportPagination';
import ReportBlock from '../../../components/DevReportBlock';
import ReportDetail from '../../../components/DevReportDetail';
import ComingSoon from '../../../components/ComingSoon';
import Icon from '../../../components/Icon';
import './Reports.scss';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: drop(1, props.location.hash),
      viewing: null,
      filter: 0,
      currentUser: null,
    }
  }

  componentDidMount() {
    this.props.history.listen((location, action) => {
      this.setState({
        type: drop(1, location.hash),
        currentUser: null,
      });
    });
    const companyId = this.props.companies[0];
    this.props.userreportsRequest(companyId);
    this.props.teamreportsRequest(companyId);
    this.props.reportsfeedsRequest(this.props.userId, 'career');
    this.props.reportsfeedsRequest(this.props.userId, 'manager');
    this.props.reportsfeedsRequest(this.props.userId, 'self');
  }

  handleFilterChange(index) {
    this.setState({ filter: index });
  }

  handleUserClick(data) {
    const { usersReports } = this.props;
    usersReports.forEach((report, index) => {
      if (equals(data.user.id, report.user.id)) {
        this.setState({ viewing: index });
      }
    });
    this.setState({ currentUser: data });
  }

  renderPages() {
    const { viewing, filter, type, currentUser } = this.state;
    const { usersReports, reportsCareers, reportsManagers, reportsSelfs } = this.props;

    switch (type) {
      case 'enterprise':
      case 'group':
      case 'company':
      case 'department':
      case 'team':
        return <ComingSoon description="API has not been ready yet. Please contact DS developers." />
      default:
        return (
          <div className="dev-reports">
            <div className="dsl-p18 title">
              <span className="capitalize">{type}</span>&nbsp;Development Report&nbsp;<Icon name="fa fa-chevron-down" size={10} />
            </div>

            {!currentUser &&
              <div>
                <Pagination
                  data={usersReports}
                  viewing={viewing}
                  filter={filter}
                  onChangeView={e => this.handleUserClick(e)}
                  onChangeFilter={e => this.handleFilterChange(e)}
                />
                <ReportBlock data={usersReports} onUserClick={(e) => this.handleUserClick(e)} />
              </div>
            }

            {currentUser &&
              <ReportDetail
                data={currentUser}
                careers={reportsCareers.data}
                managers={reportsManagers.data}
                selfs={reportsSelfs.data}
              />
            }

          </div>
        );
    }
  }

  render() {
    return (
      this.renderPages()
    );
  }
}

const mapStateToProps = state => ({
  isBusy: equals(state.app.status, 'pending'),
  companies: state.app.companies,
  userId: state.app.id,
  usersReports: state.develop.reportsUsers,
  reportsCareers: state.develop.reportsCareers,
  reportsManagers: state.develop.reportsManagers,
  reportsSelfs: state.develop.reportsSelfs,
});

const mapDispatchToProps = dispatch => ({
  userreportsRequest: (companyId) => dispatch(DevActions.userreportsRequest(companyId)),
  teamreportsRequest: (companyId) => dispatch(DevActions.teamreportsRequest(companyId)),
  reportsfeedsRequest: (userId, sort) => dispatch(DevActions.reportsfeedsRequest(userId, sort)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reports);