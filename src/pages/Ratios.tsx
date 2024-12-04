import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export const Ratios = () => {
  const schema = yup.object().shape({
    value1: yup.mixed(),
    value2: yup.mixed(),
    value3: yup.mixed(),
    value4: yup.mixed(),
  })

  const [error, setError] = useState('')

  const { register, reset, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
  })

  const onReset = () => {
    reset({
      value1: '',
      value2: '',
      value3: '',
      value4: '',
    })
    setError('')
  }

  const onSubmit = () => {
    const { value1, value2, value3, value4 } = getValues()
    const values = [value1, value2, value3, value4]
    const emptyField = values.filter(
      (value) => value === undefined || isNaN(value) || value === ''
    ).length
    if (emptyField > 1) {
      setError('Please fill out at least 3 fields')
      return
    }
    if (!value1) {
      setValue('value1', (value3 * value2) / value4)
    } else if (!value2) {
      setValue('value2', (value1 * value4) / value3)
    } else if (!value3) {
      setValue('value3', (value1 * value4) / value2)
    } else if (!value4) {
      setValue('value4', (value3 * value2) / value1)
    }
    setError('')
  }

  return (
    <Layout
      backNavigation='/'
      icon='➗'
      title='Ratios'
    >
      <div className='relative mt-8'>
        <div className='flex'>
          <Input {...register('value1')} />
          <label className='block mb-6 mx-2 text-sm  text-gray-900 dark:text-white'>
            :
          </label>
          <Input {...register('value2')} />
        </div>
        <div className='flex'>
          <Input {...register('value3')} />
          <label className='block mb-2 mx-2 text-sm  text-gray-900 dark:text-white'>
            :
          </label>
          <Input {...register('value4')} />
        </div>
        {error && (
          <div className='mb-6 w-full'>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {error}
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
