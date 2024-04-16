import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Loader.css'
import './Home.css'
import DataVaultComponent from './DataVault'

function Home () {
  const navigate = useNavigate()

  const [adicionarEvento, setAdicionarEvento] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAdicionarEvento(true)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  const redireconar = () => {
    // navigate('/cadastro')
    setTimeout(() => {
      navigate('/cadastro')
    }, 1000)
  }

  const dataFetchedRef = useRef(false)

  useEffect(() => {
    if (dataFetchedRef.current) return
    dataFetchedRef.current = true
    // Só roda uma vez em mode desenvolvimento
    console.log('Teste 1 ')
  }, [])

  return (
    <div>
      {adicionarEvento && (
        <div className='painel' onTouchStart={redireconar} onClick={redireconar}></div>
      )}
      <img src='img/bg.png' className='bg' />
      <img src='img/cabo-de-guerra.png' className='absolute cabo-de-guerra' />
      <img src='img/f-150.png' className='absolute f-150' />
      <img
        src='img/participe-do-desafio.png'
        className='absolute participe-do-desafio'
      />
      <img src='img/carro-2.png' className='absolute carro' />
      <img src='img/raca-forte.png' className='absolute raca-forte' />
      <img src='img/touch.png' className='absolute touch' />
      <img
        src='img/toque-para-comecar.png'
        className='absolute toque-para-comecar'
      />
      <iframe
          className='loader-frame'
          src='http://localhost/configuracao/'
          title='Loader'
        ></iframe>

      <DataVaultComponent />
    </div>
  )
}

export default Home
