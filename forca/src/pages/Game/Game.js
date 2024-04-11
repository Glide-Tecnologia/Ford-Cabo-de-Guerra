import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './Game.css'

function Game () {
  const FAIXA_PRETA = 50
  const FAIXA_BRANCA = 10
  const QTD_FAIXA_MINIMA = 5
  const QTD_FAIXA_MAXIMA = 15
  const TEMPO_LIMIT = 30
  const TEMPO_MINIMO = 5
  const SCORE_LIMIT = 999
  const PESO = 500
  const [log, setLog] = useState(0)
  const [nome, setNome] = useState('-')
  const [tempo, setTempo] = useState('-')
  const [velocidade, setVelocidade] = useState('-')
  const [distancia, setDistancia] = useState('-')
  const [forca, setForca] = useState('-')
  const [score, setScore] = useState('-')
  const [segundos, setSegundos] = useState(TEMPO_LIMIT)
  const [atraso, setAtraso] = useState(true)

  const navigate = useNavigate()

  const redireconar = () => {
    navigate('/resultado')
  }

  useEffect(() => {
    consultarInfo()
    setTimeout(() => {
      // setAtraso(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      // console.log(atraso)
      if (!atraso) setSegundos(segundos => segundos - 1)
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [atraso])

  useEffect(() => {
    if (segundos === 0) {
      // endGame()
      atualizar()
      console.log('FIM')
    }
  }, [segundos])

  useEffect(() => {
    // console.log(log)
    // console.log(log.length)
    if (log.length) {
      setAtraso(false)
      let ultimoTempo
      let s
      if (log.length > QTD_FAIXA_MINIMA) {
        ultimoTempo = log[QTD_FAIXA_MINIMA - 1]
        s = QTD_FAIXA_MINIMA * (FAIXA_PRETA + FAIXA_BRANCA)
      } else {
        ultimoTempo = log[log.length - 1]
        s = log.length * (FAIXA_PRETA + FAIXA_BRANCA)
      }
      s = s / 100
      let v0 = log[0]
      let vz = log[log.length - 1]
      let t = ultimoTempo - v0
      let a = s / t
      let d = (log.length * (FAIXA_PRETA + FAIXA_BRANCA)) / 100
      let tz = vz - v0
      // F = ma
      let m = PESO
      let f = m * a
      const distanciaFormatada = d.toLocaleString('pt-BR', {
        minimumFractionDigits: 2
      })
      let resultado = calcularScore(d, tz, f)
      // console.log('=======IIIIII==========')
      // console.log(resultado)
      // console.log('Espaço:' + s)
      // console.log('Tempo:' + t)
      // console.log('Aceleração/Velocidade: ' + a + 'm/s')
      // console.log('Força: ' + f + 'N') //Newtons
      // console.log('Score: ' + resultado)
      // console.log('Equação: F = ' + m + '* (' + s + '/' + t + ')')
      // console.log('=========FFFFFF========')
      setTempo(t)
      setVelocidade(a.toFixed(2))
      setDistancia(distanciaFormatada)
      setForca(f.toFixed(2))
      setScore(resultado)
    }
  }, [log])

  useEffect(() => {
    if (log.length >= QTD_FAIXA_MAXIMA) {
      atualizar()
    }
  }, [score])

  const calcularScore = (d, t, f) => {
    let resultado = 0
    // 1° distancia
    // 2° tempo
    // 3° força
    const dmax = ((FAIXA_PRETA + FAIXA_BRANCA) * QTD_FAIXA_MAXIMA) / 100
    const tmax = TEMPO_LIMIT
    const fmax =
      PESO *
      (((FAIXA_PRETA + FAIXA_BRANCA) * QTD_FAIXA_MINIMA) / 100 / TEMPO_MINIMO)

    t = TEMPO_LIMIT - t

    // console.log('Espaço MAX:' + dmax)
    // console.log('Tempo MAX:' + tmax)
    // console.log('Força MAX: ' + fmax)

    // console.log('Espaço:' + d)
    // console.log('Tempo:' + t)
    // console.log('Força: ' + f) //Newtons

    let dnew = (d / dmax) * (0.6 * SCORE_LIMIT) //60%
    let tnew = (t / tmax) * (0.25 * SCORE_LIMIT) //25%
    let fnew = (f / fmax) * (0.15 * SCORE_LIMIT) //15%
    // console.log('Espaço %:' + dnew)
    // console.log('Tempo %' + tnew)
    // console.log('Força % ' + fnew)

    // console.log(
    //   'Equação Geral: F = 50 * (' +
    //     ((FAIXA_PRETA + FAIXA_BRANCA) * QTD_FAIXA_MINIMA) / 100 +
    //     '/' +
    //     TEMPO_MINIMO +
    //     ')'
    // )

    resultado = dnew + tnew + fnew
    resultado = parseInt(resultado)

    return resultado
  }

  const consultarInfo = async () => {
    try {
      const response = await axios.get('http://192.168.0.101:3001/ultimoRegistro')
      if (response.data[0].log) setLog(JSON.parse(response.data[0].log))
      setNome(response.data[0].nome)
      setTimeout(consultarInfo, 1000)
    } catch (error) {
      console.error('Erro ao buscar o último registro:', error)
    }
  }

  const atualizar = async () => {
    try {
      const response = await axios.put('http://192.168.0.101:3001/calculo', {
        score: score,
        tempos: JSON.stringify(log),
        velocidade: velocidade,
        distancia: distancia,
        forca: forca
      })
      // console.log(response.data)
      navigate('/resultado')
      // localStorage.setItem('idJogador', response.data.id)
      // navigate('/instrucao')
      // console.log('Salvou')
    } catch (error) {
      console.log('Erro')
      // navigate('/erro')
    }
  }

  const formatarTempo = segundos => {
    const minutos = Math.floor(segundos / 60)
    const segundosRestantes = segundos % 60
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div>
      <img
        src='img/bg-game.png'
        className='bg'
        // onTouchStart={redireconar}
        // onClick={redireconar}
      />
      <div className='teste'>
        <div>00:{formatarTempo(segundos)}</div>
        <div>
          <span>Velocidade: </span>
          {velocidade == Infinity ? 0 : velocidade}
          {velocidade != '-' ? 'm/s' : ''}
        </div>
        <div>
          <span>Distancia: </span>
          {distancia}
          {distancia != '-' ? 'm' : ''}
        </div>
        <div>
          <span>Força: </span>
          {forca == Infinity ? 0 : forca}
          {forca != '-' ? 'N' : ''}
        </div>
        {/* <div>
          <span>Score: </span>
          {score}
        </div> */}
      </div>
    </div>
  )
}

export default Game
