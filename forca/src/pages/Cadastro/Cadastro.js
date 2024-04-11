import React, { useRef, useState, useEffect } from 'react'
import Keyboard from 'react-simple-keyboard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'react-simple-keyboard/build/css/index.css'
import './Cadastro.css'

function Cadastro () {
  const [inputs, setInputs] = useState({})
  const [layoutName, setLayoutName] = useState('default')
  const [inputName, setInputName] = useState('default')
  const keyboard = useRef()
  const [erro, setErro] = useState(false)

  const navigate = useNavigate()

  const inputRef = useRef(null)

  const dataFetchedRef = useRef(false)

  const salvar = async () => {
    if (inputs.name) {
      try {
        const response = await axios.post('http://192.168.0.101:3001/cadastros', {
          nome: inputs.name,
          sexo: 'M'
        })
        localStorage.setItem('idJogador', response.data.id)
        localStorage.setItem('nome', inputs.name)
        navigate('/instrucao')
        // console.log('Salvou')
      } catch (error) {
        console.log('Erro')
        // navigate('/erro')
      }
    } else {
      setErro(true)
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const customLayout = {
    // Defina o layout brasileiro personalizado aqui
    default: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L Ç',
      'Z X C V B N M {bksp}',
      '{space}'
    ],
    display: {
      '{bksp}': 'apagar'
    }
  }

  useEffect(() => {
    if (dataFetchedRef.current) return
    dataFetchedRef.current = true
    // Só roda uma vez em mode desenvolvimento
    console.log('Uma vez')
    setTimeout(() => {
      var btnBskp = document.querySelector(
        '.hg-button.hg-functionBtn.hg-button-bksp'
      )
      console.log('Mudando')
      btnBskp.innerText = 'APAGAR'
    }, 5)
  }, [])

  const onChangeAll = inputs => {
    setInputs({ ...inputs })
  }

  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default'
    setLayoutName(newLayoutName)
  }

  const onKeyPress = button => {
    console.log('Button pressed', button)
    if (button === '{bksp}') {
      console.log('APAGANDO')
      setInputs({ ...inputs })
    }
    if (button === '{shift}' || button === '{lock}') handleShift()
  }

  const onChangeInput = event => {
    console.log('ENTROU')
    const inputVal = event.target.value
    const formattedValue = inputVal
    console.log('Formato: ' + formattedValue)
    console.log(inputName)

    setInputs({
      ...inputs,
      [inputName]: formattedValue
    })

    keyboard.current.setInput(formattedValue)
  }

  const getInputValue = inputName => {
    return inputs[inputName] || ''
  }

  return (
    <div className='cadastro'>
      <img src='img/bg-cadastro.png' className='bg' />
      <div className='btn-cadastro' onTouchStart={() => salvar()}>
        PRÓXIMO
      </div>
      <div className='inputs'>
        <input
          id='name'
          autoComplete='off'
          ref={inputRef}
          type='text'
          value={getInputValue('name')}
          onFocus={() => setInputName('name')}
          placeholder={'Nome'}
          onChange={onChangeInput}
          className={!inputs.name && erro ? 'input--error' : ''}
        />
      </div>
      <div className='keyboard'>
        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          inputName={inputName}
          layoutName={layoutName}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
          layout={customLayout}
        />
      </div>
    </div>
  )
}

export default Cadastro
