import { instance } from '../../core/axios'
import { IAlbum } from '../../store/types'

interface IResponse {
  resultCount: number
  results: IAlbum[]
}

export const AlbumsApi = {
  fetchAlbums: async (query: string): Promise<IResponse> => {
    const { data } = await instance.get<IResponse>(`/albums/id/${query}`)
    return data
  },
}
