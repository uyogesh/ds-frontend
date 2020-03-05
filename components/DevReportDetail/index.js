import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image } from 'react-bootstrap';
import Icon from '../Icon';
import Header from './Header';
import Card from './Card';
import { user } from '../../layouts/Dashboard/images';
import './DevReportDetail.scss'

const DevReportDetail = ({ data, careers, managers, selfs }) => (
  <div className="report-detail">
    <Row className="header align-items-center">
      <Col xs={2} sm={2} md={2} lg={2}>
        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <Image src={user} width={64} height={64} circle />
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} className="no-left no-right">
            <span className="dsl-b14 bold">{data.user.name}</span><br />
            <span className="dsl-d12">Position: SEO</span><br />
            <span className="dsl-d12">Since: 1/1/12</span><br />
            <span className="dsl-d12">Manager: Self</span>
          </Col>
        </Row>
      </Col>
      <Col xs={10} sm={10} md={10} lg={10}>
        <Header data={data} />
      </Col>
    </Row>
    <Row>
      <Card title="Career" data={careers} />
      <Card title="Manager" data={managers} />
      <Card title="Self" data={selfs} />
    </Row>
  </div>
)

DevReportDetail.propTypes = {
};

DevReportDetail.defaultProps = {
};

export default DevReportDetail;
