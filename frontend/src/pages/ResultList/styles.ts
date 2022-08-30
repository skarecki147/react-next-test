import styled from '@emotion/styled'
import {Box, Button, Card, Typography} from '@mui/material'

export const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;
`
export const AppBar = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`
export const LogoIcon = styled('img')`
  flex: 1;
  height: 40px;
  width: 40px;
  margin: 10px 20px;

`

export const SearchRow = styled('div')`
  display: flex;
  flex: 4;
  flex-direction: row;
  width: 80%;
  justify-content: center;
  padding: 5px 40px 80px 40px;

`
export const ButtonWrapper = styled(Button)`
  width: 162px;
  height: 48px;
  border: solid 1px #DDDDDD !important;
  border-radius: 30px !important;
  margin: 0 10px;
`
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
  margin-left: 20px;
  display: flex;
  width: 500px;
  flex-direction: row;

  flex-wrap: wrap;
  align-items: center;
`
export const ColumnTitle = styled(Typography)`
  font-family: 'Readex Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: #000000;
  margin-bottom: 50px;
  margin-left: 20px;
`
export const SongRow = styled(Box)`
  box-shadow: 1px 2px 19px 1px rgba(82, 82, 82, 0.3);
  margin-top: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px 5px 10px;
  width: 100%;

`
export const SongIcon = styled('img')`
  height: 55px;
  width: 55px;
  border-radius: 5px;

`
export const SongTitle = styled(Typography)`
  font-family: 'Readex Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #2F2B2B;
  margin-left: 10px;
  max-height: 60px;
  overflow: hidden;

`
export const HeartIcon = styled('img')`
  height: 30px;
  width: 30px;
  margin-left: 20px;
`
export const ButtonText = styled('span')`
  font-family: 'Readex Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: #2563EB;
`
export const SkeletonWrapper = styled('div')`
  max-width: 200px;
  max-height: 170px;
  min-width: 200px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 20px;
`
export const SongSkeletonWrapper = styled('div')`

  margin-top: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`