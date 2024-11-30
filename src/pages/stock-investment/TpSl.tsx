import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Layout } from '../../components/Layout'
import { Input } from '../../components/Input'

export const TpSl = () => {
  const schema = yup.object().shape({
    value1: yup.string().required(),
    value2: yup.string().required(),
    value3: yup.string().required(),
    value4: yup.string().required(),
    value5: yup.string().required(),
    value6: yup.string().required(),
    result1: yup.string(),
    result2: yup.string(),
    result3: yup.string(),
  })

  const {
    register,
    formState: { errors },
    reset,
    trigger,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onReset1 = () => {
    reset({
      value1: '',
      value2: '',
    })
  }

  const onReset2 = () => {
    reset({
      value3: '',
      value4: '',
    })
  }

  const onReset3 = () => {
    reset({
      value5: '',
      value6: '',
    })
  }

  const onSubmit1 = () => {
    trigger(['value1', 'value2'])
    const { value1, value2 } = getValues()
    const int1 = parseInt(value1)
    const int2 = parseInt(value2)
    const tempResult1 = int1 / 100
    const tempResult2 = tempResult1 * int2
    const finalResult = tempResult2 + int2
    setValue('result1', 'Rp' + ' ' + finalResult)
  }

  const onSubmit2 = () => {
    trigger(['value3', 'value4'])
    const { value3, value4 } = getValues()
    const tempResult1 = value3 / 100
    const finalResult = tempResult1 * value4
    setValue('result2', 'Rp' + ' ' + finalResult)
  }

  const onSubmit3 = () => {
    trigger(['value5', 'value6'])
    const { value5, value6 } = getValues()
    const tempResult1 = value5 * 100
    const finalResult = tempResult1 / value6
    setValue('result3', finalResult + ' ' + '%')
  }

  return (
    <Layout
      backNavigation='/stock-investment'
      icon='🎯'
    >
      <div className='relative mt-8'>
        <Input
          name='value1'
          label='Increase'
          onBlur={() => {}}
          postfix='%'
          errorMessage={errors?.value1?.message}
          {...register('value1')}
        />
        <Input
          name='value2'
          label='of'
          onBlur={() => {}}
          prefix='Rp'
          errorMessage={errors?.value2?.message}
          {...register('value2')}
        />
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Result
          </label>
          <p>{getValues('result1')}</p>
        </div>
        <button
          type='button'
          onClick={onSubmit1}
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          Calculate
        </button>
        <button
          onClick={onReset1}
          type='button'
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          Reset
        </button>
      </div>
      {/* SECTION 2 */}
      <div className='relative mt-8'>
        <Input
          name='value3'
          label='What is'
          onBlur={() => {}}
          postfix='%'
          errorMessage={errors?.value3?.message}
          {...register('value3')}
        />
        <Input
          name='value4'
          label='of'
          onBlur={() => {}}
          prefix='Rp'
          errorMessage={errors?.value4?.message}
          {...register('value4')}
        />
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Result
          </label>
          <p>{getValues('result2')}</p>
        </div>
        <button
          type='button'
          onClick={onSubmit2}
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          Calculate
        </button>
        <button
          onClick={onReset2}
          type='button'
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          Reset
        </button>
      </div>
      {/* SECTION 3 */}
      <div className='relative mt-8'>
        <Input
          name='value5'
          onBlur={() => {}}
          prefix='Rp'
          errorMessage={errors?.value5?.message}
          {...register('value5')}
        />
        <Input
          name='value6'
          label='is what percent of'
          onBlur={() => {}}
          prefix='Rp'
          errorMessage={errors?.value6?.message}
          {...register('value6')}
        />
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Result
          </label>
          <p>{getValues('result3')}</p>
        </div>
        <button
          type='button'
          onClick={onSubmit3}
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          Calculate
        </button>
        <button
          onClick={onReset3}
          type='button'
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          Reset
        </button>
      </div>
    </Layout>
  )
}
