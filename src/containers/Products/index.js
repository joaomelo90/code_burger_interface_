import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import ProductsLogo from '../../assets/IMG Produto.png'
import { CardProduct } from '../../components'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import {
  Container,
  ProductsImg,
  CategoryButton,
  CategoryMenu,
  ProductsContainer
} from './styles'

export function Products({ location: { state } }) {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filterredPproducts, setFilteteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState(categoryId)

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('categories')
        const newCategory = [{ id: 0, name: 'Todos' }, ...data]
        setCategories(newCategory)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }

    async function loadProducts() {
      try {
        const { data: allProducts } = await api.get('products')
        const newProducts = allProducts.map(product => ({
          ...product,
          formatedPrice: formatCurrency(product.price)
        }))
        setProducts(newProducts)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }

    loadCategories()
    loadProducts()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteteredProducts(products)
    } else {
      const newFilterredPproducts = products.filter(
        product => product.category.id === activeCategory
      )
      setFilteteredProducts(newFilterredPproducts)
    }
  }, [activeCategory, products])

  return (
    <Container>
      <ProductsImg src={ProductsLogo} alt="logo da home" />
      <CategoryMenu>
        {categories &&
          categories.map(category => (
            <CategoryButton
              type="button"
              key={category.id}
              isActiveCategory={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id)
              }}
            >
              {category.name}
            </CategoryButton>
          ))}
      </CategoryMenu>
      <ProductsContainer>
        {filterredPproducts &&
          filterredPproducts.map(product => (
            <CardProduct key={product.id} product={product} />
          ))}
      </ProductsContainer>
    </Container>
  )
}

Products.propTypes = {
  location: PropTypes.object
}
