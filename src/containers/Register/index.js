import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Login } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import RegisterImg from '../../assets/cadastro.jpeg'
import Logo from '../../assets/logo-login.svg'
import Button from '../../components/Button'
import api from '../../services/api'
import {
  Container,
  RegisterImage,
  ContainerItens,
  Label,
  Input,
  SingInLink,
  ErrorMessage
} from './styles'

function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome Obrigatorio'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('e-mail obrigatório'),
    password: Yup.string()
      .required('senha obrigatória')
      .min(6, 'senha de 6 digitos'),
    confirmPassword: Yup.string()
      .required('senha obrigatória')
      .oneOf([Yup.ref('password')], 'Senha Divergente')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        toast.success('Cadastro Criado Com Sucesso', {
          theme: 'colored'
        })
      } else if (status === 409) {
        toast.error('E-mail já cadastrado! Faça login para continuar')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha no sistema! Tente mais tarde')
    }
  }

  return (
    <Container>
      <RegisterImage src={RegisterImg} alt="register-image" />
      <ContainerItens>
        <img src={Logo} alt="logo" />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
          <Label error={errors.email?.message}>Email</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>
            Sign un
          </Button>
        </form>
        <SingInLink>
          Já possui conta ?{' '}
          <Link style={{ color: 'white' }} to={'/login'}>
            Sing In
          </Link>
        </SingInLink>
      </ContainerItens>
    </Container>
  )
}

export default Register
