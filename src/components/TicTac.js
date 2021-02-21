import React from 'react'
import '../index.css'
import socket from '../socket'



const TicTac = ({users, ticTacs, userName, roomName, onAddTicTac}) => {   
    const [count, setCount] = React.useState(0)
    const winnerLine = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const isWinner = () => {
        let s = (count % 2 === 0)? 'X' : 'O';
        for (let i = 0; i < 8; i++){
            let line = winnerLine[i]
            if (ticTacs[line[0]] === s 
             && ticTacs[line[1]] === s 
             && ticTacs[line[2]] === s) {
             alert(s + ' win');
        }
     }
  }
    const onSendTictac = (data) => {
        socket.emit('ROOM:NEW_TICTAC', {
            userName, 
            roomName,
            tictac: (count % 2 === 0)? 'X' : 'O',
            ticId: data
        })
        onAddTicTac(ticTacs)
        
    }

    const clickHandler = event => {
        let data = event.target.getAttribute('data')
            setCount(count + 1)
            onSendTictac(data)
            console.log(count)
            console.log(ticTacs)
        isWinner()
    }    

    return(
        <div className="App">
            <div className="chat-users">
                <b>Онлайн: {users.length}</b>
                <ul>
                    {users.map((name, index) => <li key={name} >{name}</li>)}
                </ul>
            </div>
            <div className='tic-tac-toe'>
                 <div className='ttt-grid' onClick={clickHandler} data='0'>{ticTacs[0]}</div>
                 <div className='ttt-grid' onClick={clickHandler} data='1'>{ticTacs[1]}</div>
                 <div className='ttt-grid' onClick={clickHandler} data='2'>{ticTacs[2]}</div>
                 <div className='ttt-grid' onClick={clickHandler} data='3'>{ticTacs[3]}</div>
                 <div className='ttt-grid' onClick={clickHandler} data='4'>{ticTacs[4]}</div>
                 <div className='ttt-grid' onClick={clickHandler} data='5'>{ticTacs[5]}</div>
                 <div className='ttt-grid' onClick={clickHandler} data='6'>{ticTacs[6]}</div>
                 <div className='ttt-grid' onClick={clickHandler} data='7'>{ticTacs[7]}</div>
                 <div className='ttt-grid' onClick={clickHandler} data='8'>{ticTacs[8]}</div>
            </div>
            
        </div>
    )
}


export default TicTac;


