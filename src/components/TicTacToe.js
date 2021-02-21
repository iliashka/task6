import React from 'react'
import '../index.css'
import socket from '../socket'



class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            count: 0
        }
        this.winnerLine = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    }

    isWinner = () => {
        let s = (this.state.count % 2 === 0)? 'X' : 'O';
        for (let i = 0; i < 8; i++){
            let line = this.winnerLine[i]
            if (this.state.squares[line[0]] === s 
             && this.state.squares[line[1]] === s 
             && this.state.squares[line[2]] === s) {
             alert(s + ' win');
             setTimeout(() => {
                this.setState({squares: Array(9).fill(null)});
                this.setState({count: 0})
            }, 3000)
        }
        if(!this.state.squares.includes(null)){
            alert('Ничья');
         setTimeout(()=>{
            this.setState({squares: Array(9).fill(null)});
            this.setState({count:  0});
        },2000)
             break;
        }
     }
  }
    
    clickHandler = event => {
        let data = event.target.getAttribute('data')
        let currentSquares = this.props.ticTacs
        console.log(currentSquares)
        if (currentSquares[data] === null){
            currentSquares[data] = (this.state.count % 2 === 0)? 'X' : 'O';
            this.setState({ count: this.state.count + 1 })
            this.setState({ squares: currentSquares })
        }else{
            alert('Занято!')
        }
        this.isWinner()
    }    
    render() {
    return(
        <div className="App">
            <div className="chat-users">
                <b>Онлайн: {this.props.users.length}</b>
                <ul>
                    {this.props.users.map((name,index) => <li key={name} >{name}</li>)}
                </ul>
            </div>
            <div className='tic-tac-toe'>
                 <div className='ttt-grid' onClick={this.clickHandler} data='0'>{this.props.ticTacs[0]}</div>
                 <div className='ttt-grid' onClick={this.clickHandler} data='1'>{this.props.ticTacs[1]}</div>
                 <div className='ttt-grid' onClick={this.clickHandler} data='2'>{this.props.ticTacs[2]}</div>
                 <div className='ttt-grid' onClick={this.clickHandler} data='3'>{this.props.ticTacs[3]}</div>
                 <div className='ttt-grid' onClick={this.clickHandler} data='4'>{this.props.ticTacs[4]}</div>
                 <div className='ttt-grid' onClick={this.clickHandler} data='5'>{this.props.ticTacs[5]}</div>
                 <div className='ttt-grid' onClick={this.clickHandler} data='6'>{this.props.ticTacs[6]}</div>
                 <div className='ttt-grid' onClick={this.clickHandler} data='7'>{this.props.ticTacs[7]}</div>
                 <div className='ttt-grid' onClick={this.clickHandler} data='8'>{this.props.ticTacs[8]}</div>
            </div>
            
        </div>
    )
}}


export default TicTacToe;


