import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Ranking.css'

function Ranking () {
  const [nomes, setNomes] = useState([])
  const navigate = useNavigate()

  const redireconar = () => {
    setTimeout(() => {
      navigate('/home')
    }, 1000)
  }

  useEffect(() => {
    consultarInfo() // Chama a função consultarInfo assim que o componente for montado
  }, [])

  const consultarInfo = async () => {
    let dados
    try {
      const response = await axios.get('http://192.168.0.101:3001/cadastros')
      console.log(response.data)

      const jogadorId = parseInt(localStorage.getItem('idJogador')) // Certifique-se de que o ID seja um número
      console.log(jogadorId)
      const jogadorIndex = response.data.findIndex(
        jogador => jogador.id === jogadorId
      )
      console.log(jogadorIndex)

      const top10Jogadores = response.data.slice(0, 10)
      const jogador = response.data[jogadorIndex]

      if (jogadorIndex >= 10) {
        const top8Jogadores = response.data.slice(0, 8)
        dados = [
          ...top8Jogadores.map((jogador, index) => (
            <div key={index} className='ranking-line'>
              <div className='ranking-pontos'>{index + 1}.</div>
              <div className='ranking-dados'>
                <div>{jogador.nome}</div>
                <div>{jogador.score}</div>
              </div>
            </div>
          )),
          <div key='ellipsis' className='ranking-line'>
            <div className='ranking-pontos'>...</div>
            <div className='ranking-dados'>
              <div>...</div>
              <div>...</div>
            </div>
          </div>,
          <div key='self' className='ranking-line ranking-selection'>
            <div className='ranking-pontos'>{jogadorIndex + 1}.</div>
            <div className='ranking-dados'>
              <div>{jogador.nome}</div>
              <div>{jogador.score}</div>
            </div>
          </div>
        ]
      } else {
        console.log('ELSE')
        dados = top10Jogadores.map((jogador, index) => (
          <div
            key={index}
            className={`ranking-line ${
              jogador.id == jogadorId ? 'ranking-selection' : ''
            }`}
          >
            <div className='ranking-pontos'>{index + 1}.</div>
            <div className='ranking-dados'>
              <div>{jogador.nome}</div>
              <div>{jogador.score}</div>
            </div>
          </div>
        ))
      }
    } catch (error) {
      console.error('Erro ao buscar o último CNPJ:', error)
    }
    console.log(dados)
    setNomes(dados)
  }

  return (
    <div className='ranking'>
      <img
        src='img/bg-ranking.png'
        className='bg'
        onTouchStart={redireconar}
        onClick={redireconar}
      />
      <div className='container-ranking'>{nomes}</div>
    </div>
  )
}

export default Ranking
