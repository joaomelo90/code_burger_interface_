import PropTypes from 'prop-types'
import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  // fica os dados
  const [cartProducts, setCartProduts] = useState([])

  const updateLocalStorage = async product => {
    await localStorage.setItem('codeburger:cartInfo', JSON.stringify(product))
  }

  const putProductInCart = async product => {
    const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)

    let newCartProducts = []
    if (cartIndex >= 0) {
      newCartProducts = cartProducts

      newCartProducts[cartIndex].quantity =
        newCartProducts[cartIndex].quantity + 1
      setCartProduts(newCartProducts)
    } else {
      product.quantity = 1
      newCartProducts = [...cartProducts, product]
      setCartProduts(newCartProducts)
    }

    await updateLocalStorage(newCartProducts)
  }

  const deleteProducts = async productId => {
    const newCart = cartProducts.filter(product => product.id !== productId)

    setCartProduts(newCart)

    await updateLocalStorage(newCart)
  }

  const increaseProducts = async productId => {
    const newCart = cartProducts.map(product => {
      return product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    })
    setCartProduts(newCart)

    await updateLocalStorage(newCart)
  }

  const decreaseProducts = async productId => {
    const cartIndex = cartProducts.findIndex(pd => pd.id === productId)

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map(product => {
        return product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      })
      setCartProduts(newCart)

      await updateLocalStorage(newCart)
    } else {
      deleteProducts(productId)
    }
  }

  useEffect(() => {
    // responsavel de ir la no localhistory e colocar meus dados e colocar no meu cartProducts
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem('codeburger:cartInfo')

      if (clientCartData) {
        setCartProduts(JSON.parse(clientCartData))
      }
    }
    loadUserData()
  }, [])

  return (
    // tudo que eu vcolocar no value consigo deixar exposto para meu app
    <CartContext.Provider
      value={{
        putProductInCart,
        cartProducts,
        increaseProducts,
        decreaseProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used with CartContext')
  }
  return context
}

CartProvider.propTypes = {
  children: PropTypes.node
}
