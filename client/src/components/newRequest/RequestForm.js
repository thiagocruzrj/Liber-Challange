import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRequest } from '../../actions/request';

const RequestForm = ({ addRequest }) => {
  const [formData, setFormData] = useState({
    subject_id: '',
    date: '',
    time: '',
    description: ''
  });

  const { subject_id, date, time, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class='large text-primary'>Add An Class</h1>
      <p class='lead'>
        <i class='fas fa-code-branch' /> Add any developer/programming positions
        that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={e => {
          e.preventDefault();
          addRequest(formData);
        }}
      >
        <div class='form-group'>
          <input
            type='number'
            placeholder='Subject'
            name='subject_id'
            value={subject_id}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='date'
            placeholder='data'
            name='date'
            value={date}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='time'
            placeholder='time'
            name='time'
            value={time}
            onChange={e => onChange(e)}
          />
        </div>

        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' class='btn btn-primary my-1' />
      </form>
    </Fragment>
  );
};

RequestForm.propTypes = {
  addRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  { addRequest }
)(withRouter(RequestForm));
