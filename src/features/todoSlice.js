import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            // Check the new todo was same of added todo or the new todo have a letter ? if not Add it.
            const index = state.items.findIndex((item) => item.title === action.payload.title);
            if(index === -1 && action.payload.title !== ''){
                state.items.push(action.payload)
            }
        },
        setComplete: (state, action) => {
            // Check the title was same ? if yes toggle to "complete" or "uncomplete".
            const todo = state.items.find(todo => todo.title === action.payload)
            if (todo) {
                todo.complete = !todo.complete;
            }
        },
        editItem: (state, action) => {
            // Check if the edit title has letter change the old title to the new title.
            // action.payload is the object of "title" and "index".
            const [title, index] = [action.payload.title, action.payload.index]
            if(title !== ''){
                state.items[index].title = title;
            } 
        },
        removeTodo: (state, action) => {
            // Change the state to the new state without removed value.
            state.items = state.items.filter(todo => todo.title !== action.payload)
        },
    },
})


export const { addItem, setComplete, editItem, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
