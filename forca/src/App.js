import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cadastro from './pages/Cadastro/Cadastro'
import Instrucao from './pages/Instrucao/Instrucao'
import Game from './pages/Game/Game'
import Resultado from './pages/Resultado/Resultado'
import Ranking from './pages/Ranking/Ranking'
import './App.css'

function App () {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/cadastro' element={<Cadastro />}></Route>
        <Route path='/instrucao' element={<Instrucao />}></Route>
        <Route path='/game' element={<Game />}></Route>
        <Route path='/resultado' element={<Resultado />}></Route>
        <Route path='/ranking' element={<Ranking />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
