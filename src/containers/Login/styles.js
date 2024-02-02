import styled from 'styled-components'

import background from '../../assets/fundo-login.svg'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('${background}');
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginImage = styled.img`
  height: 90%;
`

export const ContainerItens = styled.div`
  background: #373737;
  border-radius: 0 10px 10px 0;
  height: 90%;
  padding: 25px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #ffffff;
    text-align: center;
    margin-top: 80px;
  }
`

export const Label = styled.p`
  font-style: normal;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: #ffffff;
  margin-top: 28px;
  margin-bottom: 5px;
`

export const Input = styled.input`
  width: 300px;
  height: 1;
  border-radius: 5px;
  background: #ffffff;
  border: ${props => (props.error ? '2px solid #cc1717' : 'none')};
  padding-left: 10px;
`

export const SingInLink = styled.p`
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #ffffff;

  a {
    cursor: pointer;
    text-decoration: underline;
  }
`
