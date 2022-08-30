import styled from '@emotion/styled'

export const CustomInput = styled('input')`
  border: #dddddd solid 1px;
  width: 580px;
  height: 44px;
  border-radius: 25px;
  padding-left: 20px;
  font-family: 'Readex Pro';

  &::placeholder {
    font-family: 'Readex Pro';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.5px;
    color: #acacac;
    text-align: start;
  }

  &:focus {
    border: #dddddd solid 1px;
    outline: #dddddd;
    font-family: 'Readex Pro';
  }
`
export const SearchIcon = styled('img')`
  cursor: pointer;
  position: relative;
  top: 6px;
  left: -35px;
`
export const SearchBox = styled('div')`
  margin-bottom: 5px;
`
