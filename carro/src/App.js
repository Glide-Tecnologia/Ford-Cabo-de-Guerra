import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const LIMIT = 250
  const [tempos, setTempos] = useState([])
  const [status, setStatus] = useState(0)
  const [cor, setCor] = useState('Preta')
  const [info, setInfo] = useState(['0', '0', '0', '200'])
  const search = async () => {
    try {
      const response = await axios.get('http://localhost:3001/info')
      if (response.data) setInfo(response.data.slice(0, -1).split(','))
      // console.log(info[0])
      if (info[3] < LIMIT && cor != 'Branca') {
        console.log('Branca')
        const dataAtual = new Date()
        let horas = dataAtual.getHours()
        let minutos = dataAtual.getMinutes()
        let segundos = dataAtual.getSeconds()
        let valorTotal = horas * 60 * 60 + minutos * 60 + segundos
        setTempos([...tempos, valorTotal])
        setCor('Branca')

        // console.log(valorTotal)
        console.log(tempos)
      }
      if (info[3] >= LIMIT) {
        // console.log('Preta')
        setCor('Preta')
      }
      // setTimeout(search, 3000)
    } catch (error) {
      console.log('Erro')
    }
  }

  const atualizar = async () => {
    try {
      const response = await axios.put('http://localhost:3001/info', {
        tempos: JSON.stringify(tempos)
      })
      console.log(response.data)
      // localStorage.setItem('idJogador', response.data.id)
      // navigate('/instrucao')
      // console.log('Salvou')
    } catch (error) {
      console.log('Erro')
      // navigate('/erro')
    }
  }

  const consultarInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3001/ultimoRegistro')
      if (response.data[0].status == 'aguardando') {
        console.log('Consulta')
        setStatus(status + 1)
      } else {
        setTempos([])
        setStatus(-1)
      }
    } catch (error) {
      console.error('Erro ao buscar o último registro:', error)
    }
  }

  useEffect(() => {
    consultarInfo()
  }, [tempos])

  useEffect(() => {
    atualizar()
  }, [status])

  useEffect(() => {
    setTimeout(search, 100)
  }, [info])

  // search()

  return (
    <div className='App'>
      <div className='container'>
        <div className='title'>Dados recebidos</div>
        <div className='data-container'>
          <div className='data-item data-item--red'>
            <div className='data-label'>Vermelho</div>
            <div className='data-value'>{info[0]}</div>
          </div>
          <div className='data-item data-item--green'>
            <div className='data-label'>Verde</div>
            <div className='data-value'>{info[1]}</div>
          </div>
          <div className='data-item data-item--blue'>
            <div className='data-label'>Azul</div>
            <div className='data-value'>{info[2]}</div>
          </div>
          <div className='data-item data-item--white'>
            <div className='data-label'>Branco</div>
            <div className='data-value'>{info[3]}</div>
          </div>
        </div>
        <hr />
        <div className='title'>Dados recebidos</div>
        <div className='data-container'>
          <div className='data-color'>
            <div
              className={`data-title ${
                parseInt(info[3]) <= LIMIT && 'data-title--white'
              }`}
            >
              Está próximo do: {parseInt(info[3]) > LIMIT ? 'Preto' : 'Branco'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
