import React from 'react'
import { useHistory } from 'react-router-dom'

import Person from '../../assets/header..svg'
import Cart from '../../assets/headerCart.svg'
import { useUser } from '../../hooks/UserContext'
import {
  Container,
  ContainerText,
  ContenderLeaft,
  PageLink,
  ContenderRight,
  Line,
  PageLinkExit
} from './styles'

export function Header() {
  const { logout, userData } = useUser()
  const {
    push,
    location: { pathname }
  } = useHistory()

  const logoutUser = () => {
    logout()
    push('/login')
  }

  return (
    <Container>
      <ContenderLeaft>
        <PageLink onClick={() => push('/')} isActive={pathname === '/'}>
          Home
        </PageLink>
        <PageLink
          onClick={() => push('/produtos')}
          isActive={pathname.includes('produtos')}
        >
          Ver Produtos
        </PageLink>
      </ContenderLeaft>

      <ContenderRight>
        <PageLink onClick={() => push('/carrinho')}>
          <img src={Cart} alt="carrinho" />
        </PageLink>
        <Line></Line>
        <PageLink>
          <img src={Person} alt="pessoa" />
        </PageLink>

        <ContainerText>
          <p>Olá, {userData.name}</p>
          <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
        </ContainerText>
      </ContenderRight>
    </Container>
  )
}
