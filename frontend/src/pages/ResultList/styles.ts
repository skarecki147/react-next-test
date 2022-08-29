import styled from '@emotion/styled'
import { Card } from '@mui/material'

export const CardWrapper = styled(Card)`
  max-width: 200px;
  max-height: 170px;
  min-width: 200px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 20px;
  -webkit-box-shadow: 1px 2px 8px 0px rgba(66, 68, 90, 0.7);
  -moz-box-shadow: 1px 2px 8px 0px rgba(66, 68, 90, 0.7);
  box-shadow: 1px 2px 8px 0px rgba(66, 68, 90, 0.7);
`

export const CardsColumn = styled('div')`
  display: flex;
  width: 500px;
  flex-direction: row;
  align-items: baseline;
  flex-wrap: wrap;
`
