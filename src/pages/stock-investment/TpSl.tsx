import { Input } from '@/components/Input.tsx'
import { Layout } from '@/components/Layout'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export const TpSl = () => {
  const schema = yup.object().shape({
    value1: yup.mixed().required('Oh noes! field must be fill!'),
    value2: yup.mixed().required('Oh noes! field must be fill!'),
    value3: yup.mixed().required('Oh noes! field must be fill!'),
    value4: yup.mixed().required('Oh noes! field must be fill!'),
    value5: yup.mixed().required('Oh noes! field must be fill!'),
    value6: yup.mixed().required('Oh noes! field must be fill!'),
    result1: yup.mixed(),
    result2: yup.mixed(),
    result3: yup.mixed(),
  })

  const {
    register,
    reset,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
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

  const onSubmit1 = async () => {
    const isValid = await trigger(['value1', 'value2'])
    if (isValid) {
      const { value1, value2 } = getValues()
      const tempResult1 = (value1 as number) / 100
      const tempResult2 = tempResult1 * (value2 as number)
      const finalResult = tempResult2 + (value2 as number)
      setValue('result1', 'Rp' + ' ' + finalResult)
    }
  }

  const onSubmit2 = async () => {
    const isValid = await trigger(['value3', 'value4'])
    if (isValid) {
      const { value3, value4 } = getValues()
      const tempResult1 = (value3 as number) / 100
      const finalResult = tempResult1 * (value4 as number)
      setValue('result2', 'Rp' + ' ' + finalResult)
    }
  }

  const onSubmit3 = async () => {
    const isValid = await trigger(['value5', 'value6'])
    if (isValid) {
      const { value5, value6 } = getValues()
      const tempResult1 = (value5 as number) * 100
      const finalResult = tempResult1 / (value6 as number)
      setValue('result3', finalResult + ' ' + '%')
    }
  }

  return (
    <Layout
      backNavigation='/stock-investment'
      icon='🎯'
      title='Take profit and stop loss'
    >
      <div className='relative mt-8'>
        <Input
          label='Increase'
          postfix='%'
          errorMessage={errors?.value1?.message}
          {...register('value1')}
        />
        <Input
          label='of'
          prefix='Rp'
          errorMessage={errors?.value2?.message}
          {...register('value2')}
        />
        {watch('result1') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Result
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('result1')}
            </label>
          </div>
        )}
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
          label='What is'
          postfix='%'
          errorMessage={errors?.value3?.message}
          {...register('value3')}
        />
        <Input
          label='of'
          prefix='Rp'
          errorMessage={errors?.value4?.message}
          {...register('value4')}
        />
        {watch('result2') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Result
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('result2')}
            </label>
          </div>
        )}
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
          prefix='Rp'
          errorMessage={errors?.value5?.message}
          {...register('value5')}
        />
        <Input
          label='is what percent of'
          prefix='Rp'
          errorMessage={errors?.value6?.message}
          {...register('value6')}
        />
        {watch('result3') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Result
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('result3')}
            </label>
          </div>
        )}
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
