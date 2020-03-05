import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Grid, Row, Col, Modal } from 'react-bootstrap';
import ArchiveList from './ArchiveList';
import Profile from '../../../components/DailyWorkPlanProfile';
import './Archive.scss';

const Archive = () => (
      <div className="dev-learn bg-main">
        <Row className="mx-0">
          <Col xs={12} sm={5} md={4} lg={3} className="px-0 pl-20 mt-20">
            <Profile />
          </Col>
          <Col xs={12} sm={6} md={8} lg={9} className="px-0">
            <ArchiveList />
          </Col>
        </Row>
      </div>
    )
  
export default Archive;
