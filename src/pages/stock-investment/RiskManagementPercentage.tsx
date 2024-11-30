import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const RiskManagementPercentage = () => {
  const schema = yup.object().shape({
    marketPrice: yup.string().required(),
    takeProfitPercentage: yup.string().required(),
    stopLossPercentage: yup.string().required(),
    takeProfitResult: yup.string(),
    stopLossResult: yup.string(),
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
      marketPrice: '',
      takeProfitPercentage: '',
      stopLossPercentage: '',
    })
  }

  const onSubmit = () => {
    trigger()
    const { marketPrice, takeProfitPercentage, stopLossPercentage } =
      getValues()
    const calculateProfitPrice1 = takeProfitPercentage / 100
    const calculateProfitPrice2 = calculateProfitPrice1 * marketPrice
    const calculateStopLossPrice1 = stopLossPercentage / 100
    const calculateStopLossPrice2 = calculateStopLossPrice1 * marketPrice
    parseInt(calculateProfitPrice2)
    parseInt(calculateStopLossPrice2)
    const numberMarketPrice = Number(marketPrice)
    setValue(
      'takeProfitResult',
      'Rp' + ' ' + (numberMarketPrice + calculateProfitPrice2)
    )
    setValue(
      'stopLossResult',
      'Rp' + ' ' + (numberMarketPrice - calculateStopLossPrice2)
    )
  }

  return (
    <Layout
      backNavigation='/stock-investment'
      icon='📊'
    >
      <div className='relative mt-8'>
        <Input
          name='marketPrice'
          label='Price'
          onBlur={() => {}}
          errorMessage={errors?.marketPrice?.message}
          prefix='Rp'
          {...register('marketPrice')}
        />
        <Input
          name='takeProfitPercentage'
          label='Take profit'
          onBlur={() => {}}
          errorMessage={errors?.takeProfitPercentage?.message}
          postfix='%'
          {...register('takeProfitPercentage')}
        />
        <Input
          name='stopLossPercentage'
          label='Stop loss'
          onBlur={() => {}}
          errorMessage={errors?.stopLossPercentage?.message}
          postfix='%'
          {...register('stopLossPercentage')}
        />
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Take profit
          </label>
          <p>{getValues('takeProfitResult')}</p>
        </div>
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Stop loss
          </label>
          <p>{getValues('stopLossResult')}</p>
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
