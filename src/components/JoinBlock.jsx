import React from 'react'
import '../index.css'
import socket from '../socket'

export default function JoinBlock() {
    return (
        <div className='join-block'>
                <input type='text' placeholder='Название комнаты'  />
                <input type='text' placeholder='Ваше имя'  />
                <button className='btn btn-success'>ВОЙТИ</button>
        </div>
    )
}
