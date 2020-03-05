import React from 'react';
import './PerformanceHeader.scss';

const PerformanceHeader = () => (
  <div className="performance-header">
    <span className="status">Status</span>
    <span className="others">Employee</span>
    <div className="space" />
    <span className="others">Inputs</span>
    <span className="others">Score</span>
  </div>
);

export default PerformanceHeader;
