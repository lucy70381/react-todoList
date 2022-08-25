import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TodoListItem from '../components/TodoListItem';
import { NavLink } from 'react-router-dom';

const Todo = () => {
  const [event, setEvent] = useState('');
  const [currentTab, setCurrentTab] = useState('全部');

  const [list, setList] = useState(
    [
      { id: 1, done: true, name: '把冰箱發霉的檸檬拿去丟' },
      { id: 2, done: false, name: '打電話叫媽媽匯款給我' },
      { id: 3, done: false, name: '整理電腦資料夾' },
      { id: 4, done: false, name: '繳電費水費瓦斯費' },
      { id: 5, done: false, name: '約vicky禮拜三泡溫泉' },
      { id: 6, done: false, name: '約ada禮拜四吃晚餐' },
    ]
  );

  const onSubmit = () => {
    setList(prev => ([...prev, { id: Date.now(), done: false, name: event }]));
    setEvent('');
  }

  const onClickTab = (e) => {
    setCurrentTab(e.target.name);
  }

  const changeState = (id) => {
    setList(prevList => (
      prevList?.map(item => {
        if (item.id !== id) return item;
        return { ...item, done: !item.done }
      })
    ));
  }

  const deleteEvent = (id) => {
    setList(prevList => (prevList?.filter(event => event.id !== id)));
  }

  const clearDone = () => {
    setList(prevList => (prevList?.filter(item => item.done === false)));
  }


  return (
    <div id='todoListPage' className='bg-half'>
      <nav>
        <h1><a>ONLINE TODO LIST</a></h1>
      </nav>
      <div className='conatiner todoListPage vhContainer'>
        <div className='todoList_Content'>
          <div className='inputBox'>
            <input type='text' placeholder='請輸入待辦事項' value={event} onChange={e => setEvent(e.target.value)} />
            <a onClick={onSubmit}>
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </div>
          {list?.length === 0 ? <p>目前尚無代辦事項</p> :
            <div className='todoList_list'>
              <ul className='todoList_tab'>
                <li><a className={currentTab === '全部' ? 'active' : ''} name='全部' onClick={onClickTab}>全部</a></li>
                <li><a className={currentTab === '待完成' ? 'active' : ''} name='待完成' onClick={onClickTab}>待完成</a></li>
                <li><a className={currentTab === '已完成' ? 'active' : ''} name='已完成' onClick={onClickTab}>已完成</a></li>
              </ul>
              <div className='todoList_items'>
                <ul className='todoList_item'>
                  {list?.filter(event => {
                    if (currentTab === '全部') return true;
                    else if (currentTab === '待完成') return event.done === false;
                    else if (currentTab === '已完成') return event.done === true;
                  }).map((item, index) => {
                    return (
                      <TodoListItem item={item} key={item.id} changeState={changeState} deleteEvent={deleteEvent} />
                    )
                  })}
                </ul>
                <div className='todoList_statistics'>
                  <p> {list?.filter(item => item.done === false)?.length} 個待完成項目</p>
                  <a onClick={clearDone}>清除已完成項目</a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Todo;
