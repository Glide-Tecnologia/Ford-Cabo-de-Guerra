const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

// Configurações do Arduino
const { SerialPort } = require('serialport')
const portSensor = new SerialPort({ path: 'COM10', baudRate: 9600 })

const app = express()
const port = 3001 // Defina a porta que deseja usar para o servidor

let dataBuffer = ''
let convertedData = '0,0,0,0' //Array separado por ; (R;G;B;A)

// Configuração do banco de dados MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ford_carro'
}

let db

// Função para conectar ao banco de dados
function connectToDatabase () {
  db = mysql.createConnection(dbConfig)

  db.connect(err => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err)
      console.log('Tentando novamente em 5 segundos...')
      setTimeout(connectToDatabase, 5000)
    } else {
      console.log('Conexão com o banco de dados estabelecida!')

      // Inicie o servidor após a conexão com o banco de dados
      startServer()
    }
  })

  db.on('error', err => {
    console.error('Erro na conexão com o banco de dados:', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log(
        'A conexão com o banco de dados foi perdida. Tentando reconectar...'
      )
      connectToDatabase()
    } else {
      throw err
    }
  })
}

portSensor.on('data', function (data) {
  dataBuffer += data.toString('utf8')

  var newlineIndex = dataBuffer.indexOf('\n')
  // console.log(newlineIndex)

  while (newlineIndex !== -1) {
    var dataLine = dataBuffer.substring(0, newlineIndex)

    if (dataLine.length > 0) {
      // console.log('Data:', dataLine)
      convertedData = dataLine
    }

    dataBuffer = dataBuffer.substring(newlineIndex + 1)
    newlineIndex = dataBuffer.indexOf('\n')
  }
})

// Função para iniciar o servidor após a conexão com o banco de dados
function startServer () {
  // Middleware para permitir solicitações de outros domínios (Cross-Origin Resource Sharing)
  app.use(cors())
  app.use(express.json())

  // Rota inicial
  app.get('/', (req, res) => {
    res.send('Bem-vindo à API do seu projeto Glide!')
  })

  // Dados do Arduino
  app.get('/info', function (req, res) {
    res.send('' + convertedData)
  })

  // Rota para criar um novo cadastro
  app.post('/cadastros', (req, res) => {
    const { nome, sexo } = req.body

    const insertSql = 'INSERT INTO jogador (nome, sexo) VALUES (?, ?)'
    const values = [nome, sexo]

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error('Erro ao criar cadastro:', err)
        res.status(500).json({ error: 'Erro ao criar cadastro' })
        return
      }

      res.json({ id: result.insertId, nome })
    })
  })

  // Rota para listar o último registro
  app.get('/ultimoRegistro', (req, res) => {
    const sql = 'SELECT * FROM jogador ORDER BY id DESC LIMIT 1'

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Erro ao buscar cadastro:', err)
        res.status(500).json({ error: 'Erro ao buscar cadastro' })
        return
      }

      res.json(result)
    })
  })

  // Rota para listar todos os cadastros
  app.get('/cadastros', (req, res) => {
    const sql = 'SELECT * FROM jogador ORDER BY score DESC'

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Erro ao buscar cadastros:', err)
        res.status(500).json({ error: 'Erro ao buscar cadastros' })
        return
      }

      res.json(result)
    })
  })

  // Rota para atualizar um cadastro
  app.put('/info', (req, res) => {
    const { tempos } = req.body // Recebe os valores do corpo da requisição
    const sql =
      'UPDATE jogador SET log = ? WHERE id = ( SELECT id FROM ( SELECT MAX(id) AS id FROM jogador ) AS subquery )'
    const values = [tempos]
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao atualizar cadastro:', err)
        res.status(500).json({ error: 'Erro ao atualizar cadastro' })
        return
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Cadastro não encontrado' })
        return
      }
      res.json({ tempos })
    })
  })

  // Rota para atualizar um cadastro
  app.put('/calculo', (req, res) => {
    const { score, tempos, velocidade, distancia, forca } = req.body // Recebe os valores do corpo da requisição
    const sql =
      'UPDATE jogador SET score = ?,tempos = ?,velocidade = ?,distancia = ?,forca = ?, status="finalizado" WHERE id = ( SELECT id FROM ( SELECT MAX(id) AS id FROM jogador ) AS subquery )'
    const values = [score, tempos, velocidade, distancia, forca]
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao atualizar cadastro:', err)
        res.status(500).json({ error: 'Erro ao atualizar cadastro' })
        return
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Cadastro não encontrado' })
        return
      }
      res.json({ tempos })
    })
  })

  // Iniciar o servidor
  app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`)
  })
}

// Iniciar a tentativa de conexão ao banco de dados
connectToDatabase()
