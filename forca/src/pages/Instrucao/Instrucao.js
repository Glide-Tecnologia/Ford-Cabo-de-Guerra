import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Instrucao.css'

function Home () {
  const navigate = useNavigate()

  const redireconar = () => {
    // navigate('/game')
    setTimeout(() => {
      navigate('/game')
    }, 1000)
  }

  return (
    <div>
      <img
        src='img/bg-instrucao.png'
        className='bg'
        onTouchStart={redireconar}
        onClick={redireconar}
      />
    </div>
  )
}

export default Home
