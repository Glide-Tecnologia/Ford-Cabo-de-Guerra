import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Resultado.css'

function Resultado () {
  const [score, setScore] = useState(0)
  const [nome, setNome] = useState('-')
  const navigate = useNavigate()

  const redireconar = () => {
    // navigate('/ranking')
    setTimeout(() => {
      navigate('/ranking')
    }, 1000)
  }

  const consultarInfo = async () => {
    try {
      const response = await axios.get(
        'http://192.168.0.101:3001/ultimoRegistro'
      )
      setScore(response.data[0].score)
      setNome(response.data[0].nome)
    } catch (error) {
      console.error('Erro ao buscar o último registro:', error)
    }
  }

  useEffect(() => {
    consultarInfo()
  }, [])

  return (
    <div>
      <img
        src='img/bg-resultado.png'
        className='bg'
        onTouchStart={redireconar}
        onClick={redireconar}
      />
      <div className='resultado-nome'>{nome}</div>
      <div className='resultado-score'>{score}</div>
    </div>
  )
}

export default Resultado
