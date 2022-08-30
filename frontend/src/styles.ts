import styled from '@emotion/styled'
import {Button} from '@mui/material'

export const TitleBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

`
export const LogoIcon = styled('img')`
  height: 55px;
  width: 55px;
  padding: 10px;
  margin: 10px;
`
export const Title = styled('p')`
  color: #2563EB;
  font-family: 'Readex Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.5px;
`
export const ButtonWrapper = styled(Button)`
  width: 162px;
  height: 48px;
  border: solid 1px #DDDDDD !important;
  border-radius: 30px !important;
  margin: 0 10px;
`
export const ButtonBox = styled('div')`
  margin-top: 10px;
  width: 580px;
  display: flex;
  flex-direction: row;
  justify-content: center;
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