import { createSlice } from "@reduxjs/toolkit";

// Check Local Storage has the "todos" ? 
// if Yes get that value and set to initialState.
// if No set the initialState to [].

const items = localStorage.getItem('todos') !== null ? JSON.parse(localStorage.getItem('todos')) : [];

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: items,
    },
    reducers: {
        addItem: (state, action) => {
            // Check the new todo was same of added todo or the new todo have a letter ? if not Add it.
            const index = state.items.findIndex((item) => item.title === action.payload.title);
            if(index === -1 && action.payload.title !== ''){
                state.items.push(action.payload)
            }

            //Update Local Storage after added todo.
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        setComplete: (state, action) => {
            // Check the title was same ? if yes toggle to "complete" or "uncomplete".
            const todo = state.items.find(todo => todo.title === action.payload)
            if (todo) {
                todo.complete = !todo.complete;
            }

            //Update Local Storage after toggled complete.
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        editItem: (state, action) => {
            // Check if the edit title has letter change the old title to the new title.
            // action.payload is the object of "title" and "index".
            const [title, index] = [action.payload.title, action.payload.index]
            if(title !== ''){
                state.items[index].title = title;
            } 

            //Update Local Storage after edited todo.
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        removeTodo: (state, action) => {
            // Change the state to the new state without removed value.
            state.items = state.items.filter(todo => todo.title !== action.payload)

            //Update Local Storage after removed todo.
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
    },
})


export const { addItem, setComplete, editItem, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
