/* eslint-disable camelcase */
import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import TodoListItem from '../components/TodoListItem';
import * as TodoAPI from '../utils/TodoAPI';
import { useAuth } from '../components/Context';

const Todo = () => {
  const [content, setContent] = useState('');
  const [currentTab, setCurrentTab] = useState('全部');
  const [list, setList] = useState([]);
  const { userData: { token, nickname }, setUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (token) {
        const res = await TodoAPI.getTodos(token);
        if (res.success) {
          setList(res?.todos ?? []);
        }
      }
    }
    fetchData();
  }, [token]);

  const onSubmit = async () => {
    if (content) {
      const body = { todo: { content } };
      const { success, id } = await TodoAPI.addTodo(token, body);
      if (success) {
        setList((prev) => [
          ...prev,
          { id, completed_at: null, content },
        ]);
        setContent('');
      }
    }
  };

  const onClickTab = (e) => {
    setCurrentTab(e.target.name);
  };

  const changeState = useCallback(async (id) => {
    const { success, completed_at } = await TodoAPI.toggleTodo(token, id);
    if (success) {
      setList((prevList) => prevList?.map((item) => {
        if (item.id !== id) return item;
        return { ...item, completed_at };
      }));
    }
  }, [token]);

  const deleteEvent = useCallback(async (id) => {
    const { success } = await TodoAPI.deleteTodo(token, id);
    if (success) {
      setList((prevList) => prevList.filter((event) => event.id !== id));
    }
  }, [token]);

  const clearDone = useCallback(() => {
    const completeList = list.filter((item) => item.completed_at !== null);
    (async () => {
      for (let i = 0; i < completeList.length; i += 1) {
        deleteEvent(completeList[i].id);
      }
    })();
  }, [deleteEvent, list]);

  const logout = useCallback(async () => {
    const { success } = await TodoAPI.logout(token);
    if (success) {
      setUserData({ token: null, nickname: null });
      navigate('/login', { replace: true });
    }
  }, [navigate, setUserData, token]);

  return (
    <div id='todoListPage' className='bg-half'>
      <nav>
        <h1><div>ONLINE TODO LIST</div></h1>
        <div className='nav-right'>

          <p>{`${nickname}的代辦`}</p>
          <button type='button' onClick={logout}>登出</button>
        </div>
      </nav>
      <div className='conatiner todoListPage vhContainer'>
        <div className='todoList_Content'>
          <div className='inputBox'>
            <input
              type='text'
              placeholder='請輸入待辦事項'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type='button' onClick={onSubmit}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {list?.length === 0 ? (
            <p>目前尚無代辦事項</p>
          ) : (
            <div className='todoList_list'>
              <ul className='todoList_tab'>
                <li>
                  <button
                    className={currentTab === '全部' ? 'active' : ''}
                    name='全部'
                    type='button'
                    onClick={onClickTab}
                  >
                    全部
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className={currentTab === '待完成' ? 'active' : ''}
                    name='待完成'
                    onClick={onClickTab}
                  >
                    待完成
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className={currentTab === '已完成' ? 'active' : ''}
                    name='已完成'
                    onClick={onClickTab}
                  >
                    已完成
                  </button>
                </li>
              </ul>
              <div className='todoList_items'>
                <ul className='todoList_item'>
                  {list
                    .filter((event) => {
                      if (currentTab === '待完成') return event.completed_at === null;
                      if (currentTab === '已完成') return event.completed_at !== null;
                      return true;
                    })
                    .map((item) => (
                      <TodoListItem
                        item={item}
                        key={item.id}
                        changeState={changeState}
                        deleteEvent={deleteEvent}
                      />
                    ))}
                </ul>
                <div className='todoList_statistics'>
                  <p>
                    {' '}
                    {list.filter((item) => !item.completed_at).length}
                    {' '}
                    個待完成項目
                  </p>
                  <button type='button' onClick={clearDone}>清除已完成項目</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
