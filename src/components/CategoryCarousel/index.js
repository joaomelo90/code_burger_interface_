import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'

import Category from '../../assets/category.png'
import api from '../../services/api'
import { Container, CategoryImg } from './styles'

function CategoryCarousel() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('categories')
      console.log(response.data)
      setCategories()
    }

    loadCategories()
  }, [])

  return (
    <Container>
      <CategoryImg src={Category} alt="text category" />
    </Container>
  )
}

export default CategoryCarousel
