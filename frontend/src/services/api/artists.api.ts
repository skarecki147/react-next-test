import { instance } from '../../core/axios'
import { IArtists } from '../../store/types'

interface IResponse {
  resultCount: number
  results: IArtists[]
}

export const ArtistsApi = {
  fetchArtists: async (query: string): Promise<IResponse> => {
    const { data } = await instance.get<IResponse>(query)
    return data
  },
}
