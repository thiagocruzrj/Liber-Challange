import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRequests } from '../../actions/request';
import Spinner from '../layout/Spinner';
import RequestItem from './RequestItem';
import RequestForm from '../newRequest/RequestForm';

const Requests = ({ getRequests, request: { requests, loading } }) => {
  useEffect(() => {
    getRequests();
  }, [getRequests]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>
        <p className='lead' />
        <RequestForm />
        <div className='posts'>
          {requests.map(request => (
            <RequestItem key={request._id} request={request} />
          ))}
        </div>
      </h1>
    </Fragment>
  );
};

Requests.propTypes = {
  getRequests: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  request: state.request
});

export default connect(
  mapStateToProps,
  { getRequests }
)(Requests);
