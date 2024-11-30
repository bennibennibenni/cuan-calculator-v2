import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const Cashback = () => {
  const schema = yup.object().shape({
    cashbackPercentage: yup.string().required(),
    maxCashback: yup.string().required(),
    result: yup.string(),
  })

  const {
    register,
    formState: { errors },
    reset,
    getValues,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onReset = () => {
    reset({
      cashbackPercentage: '',
      maxCashback: '',
    })
  }

  const onSubmit = () => {
    trigger()
    const { cashbackPercentage, maxCashback } = getValues()
    const tempResult = cashbackPercentage / 100
    const tempResult2 = maxCashback / tempResult
    setValue('result', 'Rp' + ' ' + tempResult2)
  }

  return (
    <Layout
      backNavigation='/money-management'
      icon='🎁'
    >
      <div className='relative mt-8'>
        <Input
          name='cashbackPercentage'
          label='Cashback percentage'
          onBlur={() => {}}
          errorMessage={errors?.cashbackPercentage?.message}
          {...register('cashbackPercentage')}
        />
        <Input
          name='maxCashback'
          label='Maximum cashback'
          onBlur={() => {}}
          errorMessage={errors?.maxCashback?.message}
          {...register('maxCashback')}
        />
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Result
          </label>
          <p>{getValues('result')}</p>
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
