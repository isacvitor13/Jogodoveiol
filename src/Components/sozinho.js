import React from 'react'
import som from './sons/keys.wav'
import som2 from './sons/Stereowoosh.wav'
import som3 from './sons/Calado.mp3'
import som4 from './sons/jijija.mp3'
import som5 from './sons/pewpew.mp3'
import Styles from './sozinho.module.css'
import { Link } from 'react-router-dom'




function Square(props) {
  return (
    <button className={Styles.square} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function Tocar(Qsom) {
  switch (Qsom) {
    case 1:
      new Audio(som).play()
      break
    case 2:
      new Audio(som2).play()
      break
    case 3:
      new Audio(som3).play()
      break
    case 4:
      new Audio(som4).play()
      break
    case 5:
      new Audio(som5).play()
      break

    default:
      console.log('aaaaaaa')
      break
  }
}

// function esperarCincoSegundos() {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 5000);
//   });
// }

async function BotFacil(repete, squares, aleatorio, jogada) {
  
  if (repete) {
    
    aleatorio = Math.floor(Math.random() * 9)
    while (squares[aleatorio] !== null && jogada < 8) {
      
      aleatorio = Math.floor(Math.random() * 9)
    }
    
    // setTimeout(()=>{},5000)
    squares[aleatorio] = 'O'
    Tocar(2)


  }

}


class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => { this.props.onClick(i) }}
      />
    )
  }

  render() {
    return (
      <div>
        <div className={Styles.status}>
          {this.props.status}
        </div>
        <div className={Styles.boardrow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className={Styles.boardrow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className={Styles.boardrow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      Placarx: 0,
      placarO: 0,
      Empate: 0,
      winner: null,
    }
  }



  async handleClick(i) {

    Tocar(5)

    let history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    let aleatorio = null;


    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = "X"
    console.log(squares)
    // await esperarCincoSegundos()
    
    let repete = false
    for (let rep = 0; rep < 8; rep++) {
      if (squares[rep] === null) {
        repete = true
      }
    }

   
    console.log('teste')
 await   BotFacil(repete, squares, aleatorio, this.state.stepNumber)

    
    const winner = calculateWinner(squares)
    let Placarx = this.state.Placarx
    let placarO = this.state.placarO
    let Empate = this.state.Empate
    if (winner) {
      if (winner === 'X') {
        Placarx++
        Tocar(3)
      } else {
        placarO++
        Tocar(4)
      }
      
    } else if (this.state.stepNumber === 4) {
      Empate++
    }
    
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: this.state.xIsNext,
      Placarx: Placarx,
      placarO: placarO,
      Empate: Empate,
      winner: winner,
    })
    // await esperarCincoSegundos()

   

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      winner: null,
    })
  }

  resetarPlacar() {
    this.setState({
      Placarx: 0,
      placarO: 0,
      Empate: 0,
    })
  }

  resetGame() {
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      winner: null,
    })
  }

  render() {
    const history = this.state.history
    console.log(history)
    const current = history[this.state.stepNumber]
    const winner = this.state.winner

    let status
    let status2

    if (winner) {
      status = `Ganhador  ${winner}`
      status2 = 'Ganhador'
      
     
    } else if (!winner) {
      status = `Próximo Jogador :  ${(this.state.xIsNext ? 'X' : 'O')}`
      status2 = 'Próximo Jogador'

    }

    // const moves = history.map((step, move) => {
    //   const desc = move ? 'Voltar para a jogada ' + move : 'Inicio'
    //   return (
    //     <li key={move}>
    //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
    //     </li>
    //   )
    // })


    if (this.state.stepNumber === 5 && !winner) {
      status = 'Empate'
      status2 = 'Empate'
    }


    let newGameButton = null
    if (this.state.stepNumber > 0) {
      newGameButton = <button className={Styles.novozerar} onClick={() => this.resetGame()}>Novo Jogo</button>
    }


    return (
      <div className={Styles.game}>
        <div className={Styles.gameboard}>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}

          />
        </div>
        <div className={Styles.gameinfo}>
          <div className={status2}>{status}</div>
          <h2>Placar:</h2>
          <h3>Jogador X: {this.state.Placarx}</h3>
          <h3>Jogador O: {this.state.placarO}</h3>
          <h3>Empate: {this.state.Empate}</h3>
          <button className={Styles.novozerar} onClick={() => this.resetarPlacar()}>Zerar Placar</button>
          {newGameButton}
          {/* <ol>{moves}</ol> */}
        </div>
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}


function Sozinho(){
  return(
  <>
  <Link className={Styles.modo} to='/dificil'>Ir para o dificil</Link>
  <Game/>
  </>)
}
export default Sozinho