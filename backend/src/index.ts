import axios from 'axios'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

const app = express()
const testURL = 'https://itunes.apple.com/search?term=jack+johnson.'
const url: string = 'https://itunes.apple.com/search?term='
const allArtistQuery = '&entity=allArtist&attribute=allArtistTerm'
const albumQuery = '&entity=album'
const songQuery = '&entity=song'
const data: any = []

// @ts-ignore
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// 1) https://itunes.apple.com/search?term=`${query}`&entity=allArtist&attribute=allArtistTerm ALL ARTISTS by query
// 2) https://itunes.apple.com/lookup?amgArtistId=${amgArtistId}&entity=album
// 3) https://itunes.apple.com/lookup?amgArtistId={amgArtistId}&entity=song

async function getArtists(query: string) {
  let queryUrl = `${url}${query}${allArtistQuery}`
  queryUrl = queryUrl.replace(' ', '+')
  console.log('queryUrl', queryUrl)
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

async function getAlbum(query: string) {
  let queryUrl = `${url}${query}${albumQuery}`
  queryUrl = queryUrl.replace(' ', '+')
  console.log('queryUrl', queryUrl)
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

async function getSongs(query: string) {
  let queryUrl = `${url}${query}${songQuery}`
  queryUrl = queryUrl.replace(' ', '+')
  console.log('queryUrl', queryUrl)
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

    const payload = await getArtists(query)

    res.send(payload)
  } catch (error: any) {
    res.status(409).json({ message: error.message })
  }
})

app.get('/songs/id/:amgArtistId', async (req: Request, res: Response) => {
  const { amgArtistId } = req.params

  try {
    console.log('request body: ', amgArtistId)

    const payload = await getSongs(amgArtistId)

    res.send(payload)
  } catch (error: any) {
    res.status(409).json({ message: error.message })
  }
})

app.get('/albums/id/:amgArtistId', async (req: Request, res: Response) => {
  const { amgArtistId } = req.params

  try {
    console.log('request body: ', amgArtistId)

    const payload = await getAlbum(amgArtistId)

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
