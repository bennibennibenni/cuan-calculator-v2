import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { useLayoutEffect } from 'react'

import * as yup from 'yup'

interface CurrencyApiResponse {
  usd: {
    idr: number
  }
}

export const CurrencyConverter = () => {
  const schema = yup.object().shape({
    amount: yup.mixed().required('Oh noes! field must be fill!'),
    data: yup.mixed(),
    result: yup.mixed(),
  })

  const {
    register,
    resetField,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onReset = () => {
    resetField('amount')
    setValue('result', '')
  }

  const onSubmit = async () => {
    const isValid = await trigger()
    if (isValid) {
      const { data, amount } = getValues()
      if (amount && data) {
        setValue('result', ((amount as number) * data) as number)
      }
    }
  }

  const fetchMyAPI = async () => {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
    )
    const data: CurrencyApiResponse = await response.json()
    setValue('data', data?.usd?.idr)
  }

  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(today)

  const formatToCurrency = (number: number | undefined) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number ?? 0)
  }

  useLayoutEffect(() => {
    fetchMyAPI()
  }, [])

  return (
    <Layout
      backNavigation='/'
      icon='💱'
      title='Currency converter'
    >
      <div className='relative mt-8'>
        <Input
          errorMessage={errors?.amount?.message}
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
          {watch('result') && (
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {formatToCurrency(watch('result'))} IDR
            </label>
          )}
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
