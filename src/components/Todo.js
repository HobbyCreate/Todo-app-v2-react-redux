import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addItem, setComplete, editItem, removeTodo } from '../features/todoSlice';
import { CiSquareRemove } from 'react-icons/ci';
import { RiEditBoxLine } from 'react-icons/ri';

function Todo() {
    const todos = useSelector(state => state.todos.items);
    const dispatch = useDispatch();
    const [todoTitle, setTodoTitle] = useState('');
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState();


    const addTodohandler = () => {
        dispatch(addItem(
            {
                title: todoTitle,
                complete: false
            }))
        setTodoTitle("");
    }

    const editTodohandler = () => {
        dispatch(editItem({ title: todoTitle, index: editIndex }))
        setEdit(false);
        setTodoTitle("")
    }

    return (
        <>
            {/* Check the Edit state! 
            if edit state is "true" UI will show area for edit todo.
            if edit state is "false" UI will show area for add todo. */}
            {!edit ?
                (<div className="input-container">
                    <input
                        type="text"
                        className="input-area"
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                    />
                    <button
                        className="edit-btn add-btn"
                        onClick={addTodohandler}

                    >
                        Add
                    </button>
                </div>)
                :
                (<div className="input-container">
                    <input
                        type="text"
                        className="input-area"
                        placeholder="Edit Todo Here"
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                    />
                    <button
                        className="add-btn"
                        onClick={editTodohandler}
                    >
                        Edit
                    </button>
                </div>)
            }
            {/* ================================================================================== */}
            {/* render the added todo */}
            <div>
                {todos.map((todo, idx) =>
                    <div key={idx}
                        className={todo.complete === false
                            ? "title-container"
                            : "title-container-uncomplete"}
                    >
                        <input type="checkbox"
                            className="input-checkbox"
                            onClick={() => dispatch(setComplete(todo.title))}
                        />
                        <p className="todo-title">{todo.title}</p>
                        <div>
                            <CiSquareRemove
                                onClick={() => {
                                    dispatch(removeTodo(todo.title))
                                    localStorage.setItem('list', todos)
                                }}
                                className="delete-btn"
                            />
                            <RiEditBoxLine
                                onClick={() => {
                                    setEdit(true)
                                    setEditIndex(idx)
                                }}
                                className="delete-btn"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Todo