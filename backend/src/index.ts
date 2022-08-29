import axios from 'axios'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

const app = express()
const testURL = 'https://itunes.apple.com/search?term=jack+johnson.'
const url: string = 'https://itunes.apple.com/search?term='
const data: any = []

// @ts-ignore
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

async function getData(query: string) {
  let queryUrl = `${url}${query}`
  queryUrl = queryUrl.replace(' ', '+')
  console.log(queryUrl)
  try {
    const { data, status } = await axios.get<any>(queryUrl, {
      headers: {
        Accept: 'application/json',
      },
    })

    console.log('response status is: ', status)

    return JSON.stringify(data, null, 4)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('unexpected error: ', error)
      return 'An unexpected error occurred'
    }
  }
}

// getData();
app.get('/:query', async (req: Request, res: Response) => {
  const { query } = req.params

  try {
    console.log('request body: ', query)

    const payload = await getData(query)

    res.send(payload)
  } catch (error: any) {
    res.status(409).json({ message: error.message })
  }
})

app.get('/', (req: Request, res: Response): void => {
  res.send(data)
})
app.listen('5000', (): void => {
  console.log('Server Running')
})
