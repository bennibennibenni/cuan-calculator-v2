import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export const RiskManagement = () => {
  const schema = yup.object().shape({
    marketPrice: yup.mixed().required('Oh noes! field must be fill!'),
    takeProfitPrice: yup.mixed().required('Oh noes! field must be fill!'),
    stopLossPrice: yup.mixed().required('Oh noes! field must be fill!'),
    takeProfitResult: yup.mixed(),
    stopLossResult: yup.mixed(),
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

  const onReset = () => {
    reset({
      marketPrice: '',
      takeProfitPrice: '',
      stopLossPrice: '',
    })
  }

  const onSubmit = async () => {
    const isValid = await trigger()
    if (isValid) {
      const { marketPrice, takeProfitPrice, stopLossPrice } = getValues()
      const calcualteProfitPrice1 =
        (takeProfitPrice as number) - (marketPrice as number)
      const calcualteProfitPrice2 =
        (calcualteProfitPrice1 * 100) / (marketPrice as number)
      const calcualteStopLossPrice1 =
        (marketPrice as number) - (stopLossPrice as number)
      const calcualteStopLossPrice2 =
        (calcualteStopLossPrice1 * 100) / (marketPrice as number)
      setValue('takeProfitResult', calcualteProfitPrice2 + ' ' + '%')
      setValue('stopLossResult', calcualteStopLossPrice2 + ' ' + '%')
    }
  }

  return (
    <Layout
      backNavigation='/stock-investment'
      icon='🛡️'
      title='Risk management'
    >
      <div className='relative mt-8'>
        <Input
          label='Price'
          errorMessage={errors?.marketPrice?.message}
          prefix='Rp'
          {...register('marketPrice')}
        />
        <Input
          label='Take profit'
          errorMessage={errors?.takeProfitPrice?.message}
          prefix='Rp'
          {...register('takeProfitPrice')}
        />
        <Input
          label='Stop loss'
          errorMessage={errors?.stopLossPrice?.message}
          prefix='Rp'
          {...register('stopLossPrice')}
        />
        {watch('takeProfitResult') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Take profit
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('takeProfitResult')}
            </label>
          </div>
        )}
        {watch('stopLossResult') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Stop loss
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('stopLossResult')}
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
