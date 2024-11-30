import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const Devidends = () => {
  const schema = yup.object().shape({
    lot: yup.string().required(),
    dps: yup.string().required(),
    tax: yup.string().required(),
    devidendTax: yup.string(),
    finalDevidend: yup.string(),
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
      lot: '',
      dps: '',
      tax: '',
    })
  }

  const onSubmit = () => {
    trigger()
    const { lot, dps, tax } = getValues()
    const devidendTax = (tax / 100) * (lot * 100 * dps)
    const finalDevidend = lot * 100 * dps - tax
    setValue('devidendTax', 'Rp' + ' ' + devidendTax)
    setValue('finalDevidend', 'Rp' + ' ' + finalDevidend)
  }

  return (
    <Layout
      backNavigation='/stock-investment'
      icon='🏦'
    >
      <div className='relative mt-8'>
        <Input
          name='value1'
          label='Lot'
          onBlur={() => {}}
          errorMessage={errors?.lot?.message}
          {...register('lot')}
        />
        <Input
          name='dps'
          label='Devidend per share'
          onBlur={() => {}}
          errorMessage={errors?.dps?.message}
          prefix='Rp'
          {...register('dps')}
        />
        <Input
          name='tax'
          label='Tax'
          onBlur={() => {}}
          errorMessage={errors?.tax?.message}
          postfix='%'
          {...register('tax')}
        />
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Tax Paid for Deviden
          </label>
          <p>{getValues('devidendTax')}</p>
        </div>
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Deviden after Tax
          </label>
          <p>{getValues('finalDevidend')}</p>
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
