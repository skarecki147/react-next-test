import { ISong, LoadingStatus } from '../../../types'

export interface ItemsState {
  data: ISong[] | undefined
  status: LoadingStatus
}
