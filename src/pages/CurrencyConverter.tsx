import React, { useLayoutEffect } from 'react'

import { Input } from '../components/Input'
import { Layout } from '../components/Layout'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const CurrencyConverter = () => {
  const schema = yup.object().shape({
    data: yup.string(),
    amount: yup.string().required(),
    result: yup.string(),
  })

  const {
    register,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onReset = () => {
    reset({
      amount: '',
    })
  }

  const onSubmit = () => {
    trigger()
    const { data, amount } = getValues()
    setValue('result', amount * data)
  }

  const fetchMyAPI = async () => {
    let response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
    )
    response = await response.json()
    setValue('data', response?.usd.idr)
    console.log(response?.usd.idr, 'response')
  }

  const today = new Date()
  const options = { day: '2-digit', month: 'long', year: 'numeric' }
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(today)

  const formatToCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number)
  }

  useLayoutEffect(() => {
    fetchMyAPI()
  }, [])

  return (
    <Layout
      backNavigation='/'
      icon='💱'
    >
      <div className='relative mt-8'>
        <Input
          name='amount'
          label='Amount'
          onBlur={() => {}}
          errorMessage={errors?.convert?.message}
          postfix='USD'
          {...register('amount')}
        />
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            1 USD = {formatToCurrency(watch('data'))} IDR - {formattedDate}
          </label>
          <p>{formatToCurrency(getValues('result'))} IDR</p>
        </div>
        <button
          type='button'
          onClick={onSubmit}
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          Calculate
        </button>
        <button
          onClick={onReset}
          type='button'
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          Reset
        </button>
      </div>
    </Layout>
  )
}
