const express = require('express')
const { Configuration, OpenAIApi } = require('openai')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const Port = process.env.Port || 5000
let user = 'Learner'

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: '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',
  })
)

app.post('/user', (req, res) => {
  const { userName } = req.body
  user = userName
  console.log(user)
})
app.get('/user', (req, res) => {
  res.status(200).json(user)
})

app.post('/chat', async (req, res) => {
  const { model, messages } = req.body
  try {
    const response = await openAi.createChatCompletion({
      model,
      messages,
    })
    console.log(response.data.choices)
    res.send(response.data.choices[0].message.content)
  } catch (error) {
    res.send(
      'Something Wrong with the server. Please Refresh the page or try to speak again'
    )
  }
})

app.listen(Port, () => {
  console.log('API server started on', Port)
})
