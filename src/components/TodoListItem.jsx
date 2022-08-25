import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TodoListItem = ({ item: { name, done, id }, changeState, deleteEvent }) => {

  return (
    <li>
      <label className="todoList_label">
        <input className="todoList_input" type="checkbox" checked={done} onChange={() => changeState(id)} />
        <span>{name}</span>
      </label>
      <a onClick={() => deleteEvent(id)}>
        <FontAwesomeIcon icon={faTimes} />
      </a>
    </li>
  )
}

export default memo(TodoListItem);