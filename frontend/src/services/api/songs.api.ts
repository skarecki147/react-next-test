import { instance } from '../../core/axios'
import { ISong } from '../../store/types'

interface IResponse {
  resultCount: number
  results: ISong[]
}

export const SongsApi = {
  fetchSongs: async (query: string): Promise<IResponse> => {
    const { data } = await instance.get<IResponse>(query)
    return data
  },
}
