import React from 'react'
import JoinBlock from './components/JoinBlock';
import './index.css'
import reducer from './reducer'
import socket from './socket'
import axios from 'axios'
import TicTac from './components/TicTac';

function App () {
    const [state, dispatch] = React.useReducer(reducer, {
        joined: false,
        roomName: null,
        userName: null,
        users: [],
        ticTacs: Array(9).fill(null),
        count: 0
    });

    const onLogin = async (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        });
        socket.emit('ROOM:JOIN', obj)
        const { data } = await axios.get(`/rooms/${obj.roomName}`);
        setUsers(data.users)
    };

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users,
        });
    };

    const addTicTac = (ticTacField) => {
        dispatch({
            type: 'NEW_TICTAC',
            payload: ticTacField 
        })
    }

    React.useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers);
        socket.on('ROOM:NEW_TICTAC', addTicTac)
    }, [])

    window.socket = socket;

    return(
       <div className='wrapper'>
           {!state.joined ? <JoinBlock onLogin={onLogin} /> : <TicTac onAddTicTac={addTicTac} {...state} />}
       </div> 
    )
}

export default App