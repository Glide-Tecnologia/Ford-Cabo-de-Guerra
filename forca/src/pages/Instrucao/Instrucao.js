import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Instrucao.css'

function Home () {
  const navigate = useNavigate()

  const redireconar = () => {
    // atualizar()
    navigate('/game')
  }

  // const atualizar = async () => {
  //   console.log('ATUALIZANDO')
  //   try {
  //     const response = await axios.get('http://192.168.1.100:3001/zerar')
  //     navigate('/game')
  //   } catch (error) {
  //     console.log('Erro')
  //     // navigate('/erro')
  //   }
  // }

  return (
    <div>
      <img src='img/bg.png' className='bg' />
      <div className='instrucoes'>
        INSTRUÇÕES
        <img src='img/til.png' className='til' />
      </div>
      <div className='instrucoes-text'>
        <div>1 - SEGURE FIRME A CORDA</div>
        <div>2 - PUXE COM FORÇA</div>
        <div>
          3 - MOSTRE SUA RAÇA
          <br />
          FORTE E VEJA SEU <br />
          RANKING FINAL
        </div>
      </div>
      <div
        className='btn-cadastro'
        onTouchStart={redireconar}
        onClick={redireconar}
      >
        PRÓXIMO
        <img src='img/acento-preto.png' className='acento-preto' />
      </div>
      <img src='img/carro-2.png' className='absolute carro' />
      <img src='img/raca-forte.png' className='absolute raca-forte' />
    </div>
  )
}

export default Home
