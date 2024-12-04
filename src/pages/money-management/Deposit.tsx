import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export const Deposit = () => {
  const schema = yup.object().shape({
    initialDeposit: yup.mixed().required('Oh noes! field must be fill!'),
    tenureMonths: yup.mixed().required('Oh noes! field must be fill!'),
    annualInterestRate: yup.mixed().required('Oh noes! field must be fill!'),
    annualTaxRate: yup.mixed().required('Oh noes! field must be fill!'),
    net: yup.mixed(),
    gross: yup.mixed(),
    taxOnInterest: yup.mixed(),
    interestBeforeTax: yup.mixed(),
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
      initialDeposit: '',
      tenureMonths: '',
      annualInterestRate: '',
      annualTaxRate: '',
    })
  }

  const onSubmit = async () => {
    const isValid = await trigger()
    if (isValid) {
      const {
        initialDeposit,
        tenureMonths,
        annualInterestRate,
        annualTaxRate,
      } = getValues()
      // Calculate the tenure in years
      const year = (tenureMonths as number) / 12
      // Total amount before tax (Gross)
      const gross =
        (initialDeposit as number) *
        (1 + ((annualInterestRate as number) / 100) * year)
      // Interest earned before tax
      const interestBeforeTax =
        (initialDeposit as number) *
        ((annualInterestRate as number) / 100) *
        year
      // Tax on interest
      const taxOnInterest =
        interestBeforeTax * ((annualTaxRate as number) / 100)
      // Total amount after tax (Net)
      const net = gross - taxOnInterest
      setValue('gross', 'Rp' + '' + gross)
      setValue('interestBeforeTax', 'Rp' + '' + interestBeforeTax)
      setValue('taxOnInterest', 'Rp' + '' + taxOnInterest)
      setValue('net', 'Rp' + '' + net)
    }
  }

  return (
    <Layout
      backNavigation='/money-management'
      icon='🏦'
      title='Deposit'
    >
      <div className='relative mt-8'>
        <Input
          label='Initial deposit'
          errorMessage={errors?.initialDeposit?.message}
          prefix='Rp'
          {...register('initialDeposit')}
        />
        <Input
          label='tenure'
          errorMessage={errors?.tenureMonths?.message}
          postfix='bulan'
          {...register('tenureMonths')}
        />
        <Input
          label='Annual interest rate'
          errorMessage={errors?.annualInterestRate?.message}
          postfix='%'
          {...register('annualInterestRate')}
        />
        <Input
          label='Annual tax rate'
          errorMessage={errors?.annualTaxRate?.message}
          postfix='%'
          {...register('annualTaxRate')}
        />
        {watch('gross') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Total amount before tax (Gross)
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('gross')}
            </label>
          </div>
        )}
        {watch('interestBeforeTax') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Interest earned before tax
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('interestBeforeTax')}
            </label>
          </div>
        )}
        {watch('taxOnInterest') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Tax on interest
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('taxOnInterest')}
            </label>
          </div>
        )}
        {watch('net') && (
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Total amount after tax (Net)
            </label>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>
              {watch('net')}
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
