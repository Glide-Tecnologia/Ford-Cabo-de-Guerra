import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Resultado.css'

function Resultado () {
  const [score, setScore] = useState(0)
  const [nome, setNome] = useState('-')
  const [index1, setIndex1] = useState(0)
  const [index2, setIndex2] = useState(1)
  const [index3, setIndex3] = useState(2)
  const navigate = useNavigate()

  const urls = ['img/seta-1.png', 'img/seta-2.png', 'img/seta-3.png']

  const redireconar = () => {
    // navigate('/ranking')
    setTimeout(() => {
      navigate('/ranking')
    }, 1000)
  }

  const consultarInfo = async () => {
    try {
      const response = await axios.get('http://192.168.1.102:3001/ultimoRegistro')
      setScore(response.data[0].score)
      setNome(response.data[0].nome)
    } catch (error) {
      console.error('Erro ao buscar o último registro:', error)
    }
  }

  useEffect(() => {
    consultarInfo()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // Atualiza o índice da imagem para cada seta
      setIndex1(prevIndex => (prevIndex + 1) % 3)
      setIndex2(prevIndex => (prevIndex + 1) % 3)
      setIndex3(prevIndex => (prevIndex + 1) % 3)
    }, 500) // Altera a cada segundo

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <img src='img/bg.png' className='bg' />
      <div
        className='btn-cadastro'
        onTouchStart={redireconar}
        onClick={redireconar}
      >
        PRÓXIMO
        <img src='img/acento-preto.png' className='acento-preto' />
      </div>

      <img src={urls[index1]} className='absolute seta-1' alt='Seta 1' />
      <img src={urls[index2]} className='absolute seta-2' alt='Seta 2' />
      <img src={urls[index3]} className='absolute seta-3' alt='Seta 3' />

      <div className='txt-tempo'>SEU TEMPO ACABOU</div>
      <div className='txt-score'>SEU SCORE É:</div>

      <img src='img/input.png' className='input-img input-img--resultado' />
      <div className='resultado-nome'>{nome}</div>
      <div className='resultado-score'>{score}</div>
      <img src='img/raca-forte.png' className='absolute raca-forte' />
    </div>
  )
}

export default Resultado
