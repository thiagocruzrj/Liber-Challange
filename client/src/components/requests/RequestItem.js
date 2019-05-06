import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const RequestItem = ({
  auth,
  request: { _id, subject, date, time, description }
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <p>Subject: {subject}</p>
        <p class='post-date'>
          Date: <Moment format='YYYY-MM-DD'>{date}</Moment>
        </p>

        <p class='post-date'>
          Time: <Moment format='HH:MM'>{time}</Moment>
        </p>
        <p>Description: {description}</p>
      </div>
    </div>
  );
};

RequestItem.propTypes = {
  request: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(RequestItem);
