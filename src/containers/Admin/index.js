import PropTypes from 'prop-types'
import React from 'react'

import { SideMenuAdmin } from '../../components'
import paths from '../../constants/paths'
import EditProduct from './EditProduct'
import ListProducts from './ListProducts'
import NewProducts from './NewProducts'
import Orders from './Orders'
import { Container, ContainerItens } from './styles'

export function Admin({ match: { path } }) {
  return (
    <Container>
      <SideMenuAdmin path={path} />
      <ContainerItens>
        {path === paths.Order && <Orders />}
        {path === paths.ListProducts && <ListProducts />}
        {path === paths.NewProducts && <NewProducts />}
        {path === paths.EditProducts && <EditProduct />}
      </ContainerItens>
    </Container>
  )
}
Admin.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string
  })
}
