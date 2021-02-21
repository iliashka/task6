import React from 'react'
import axios from 'axios'
import '../index.css'
import socket from '../socket'

export default function JoinBlock({onLogin}) {
    const [roomName, setRoomName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);

    const onEnter = async () => {
        if (!roomName || !userName){
            return alert('Неверные данные');
        }
        const obj = {
            roomName,
            userName
        }
        setLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj);
    }; 

    return (
        <div className='join-block'>
                <input type='text' placeholder='Название комнаты' value={ roomName } onChange={ e => setRoomName(e.target.value) } />
                <input type='text' placeholder='Ваше имя' value={ userName } onChange={ e => setUserName(e.target.value) } />
                <button disabled={isLoading} onClick={ onEnter } className='btn btn-success'>
                    {isLoading? 'ВХОД...' : 'ВОЙТИ'}
                </button>
        </div>
    )
}
