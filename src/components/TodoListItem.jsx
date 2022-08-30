/* eslint-disable camelcase */
import React, { memo } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TodoListItem = ({ item: { content, id, completed_at }, changeState, deleteEvent }) => (
  <li>
    <label className='todoList_label' htmlFor='todoList-input'>
      <input className='todoList_input' type='checkbox' id='todoList - input' checked={completed_at != null} onChange={() => changeState(id)} />
      <span>{content}</span>
    </label>
    <button type='button' onClick={() => deleteEvent(id)}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </li>
);

TodoListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    completed_at: oneOfType([PropTypes.string, PropTypes.object]),
  }),
  changeState: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

TodoListItem.defaultProps = {
  item: PropTypes.shape({
    id: '',
    content: '',
    completed_at: null,
  }),
};

export default memo(TodoListItem);
