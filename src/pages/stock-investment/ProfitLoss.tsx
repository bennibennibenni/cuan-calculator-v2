import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const ProfitLoss = () => {
  const schema = yup.object().shape({
    price1: yup.string().required('Oh noes! field must be fill!'),
    price2: yup.string().required('Oh noes! field must be fill!'),
    result: yup.string(),
  })

  const {
    register,
    formState: { errors },
    reset,
    getValues,
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onReset = () => {
    reset({
      price1: '',
      price2: '',
    })
  }

  const onSubmit = async () => {
    const isValid = await trigger()
    if (isValid) {
      const { price1, price2 } = getValues()
      const res = ((price2 - price1) / price1) * 100
      setValue('result', res + ' ' + '%')
    }
  }

  return (
    <Layout
      backNavigation='/stock-investment'
      icon='💰'
      title='Profit and loss'
    >
      <div className='relative mt-8'>
        <Input
          name='price1'
          label='Price 1'
          onBlur={() => {}}
          errorMessage={errors?.price1?.message}
          {...register('price1')}
        />
        <Input
          name='price2'
          label='Price 2'
          onBlur={() => {}}
          errorMessage={errors?.price2?.message}
          {...register('price2')}
        />
        {watch('result') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm  text-gray-900 dark:text-white'
            >
              Result
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('result')}
            </label>
          </div>
        )}
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
