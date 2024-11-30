import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const Deposit = () => {
  const schema = yup.object().shape({
    depositAwal: yup.string().required(),
    tenor: yup.string().required(),
    depositTime: yup.string().required(),
    yearTax: yup.string().required(),
    yearInterest: yup.string().required(),
    result: yup.string(),
    beforeInterest: yup.string(),
    afterInterest: yup.string(),
    taxInterest: yup.string(),
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
      depositAwal: '',
      tenor: '',
      depositTime: '',
      yearTax: '',
      yearInterest: '',
    })
  }

  const onSubmit = () => {
    trigger()
    const { depositAwal, tenor, depositTime, yearTax, yearInterest } =
      getValues()
    const beforeInterest = (((depositAwal * yearInterest) / 100) * tenor) / 12
    const taxInterest =
      ((((depositAwal * yearInterest) / 100) * tenor) / 12) * (yearTax / 100)
    const afterInterest =
      (((depositAwal * yearInterest) / 100) * tenor) / 12 -
      ((((depositAwal * yearInterest) / 100) * tenor) / 12) * (yearTax / 100)
    const result =
      (((depositAwal * yearInterest) / 100) * tenor) / 12 -
      ((((depositAwal * yearInterest) / 100) * tenor) / 12) * (yearTax / 100) +
      depositAwal
    setValue('beforeInterest', 'Rp' + ' ' + beforeInterest)
    setValue('taxInterest', 'Rp' + ' ' + taxInterest)
    setValue('afterInterest', 'Rp' + ' ' + afterInterest)
    setValue('result', 'Rp' + ' ' + result)
  }

  return (
    <Layout
      backNavigation='/money-management'
      icon='🏦'
    >
      <div className='relative mt-8'>
        <Input
          name='depositAwal'
          label='Deposit awal'
          onBlur={() => {}}
          errorMessage={errors?.depositAwal?.message}
          prefix='Rp'
          {...register('depositAwal')}
        />
        <Input
          name='tenor'
          label='Tenor'
          onBlur={() => {}}
          errorMessage={errors?.tenor?.message}
          postfix='bulan'
          {...register('tenor')}
        />
        <Input
          name='depositTime'
          label='Deposit time (tahun)'
          onBlur={() => {}}
          errorMessage={errors?.depositTime?.message}
          postfix='tahun'
          {...register('depositTime')}
        />
        <Input
          name='yearTax'
          label='Bunga per tahun'
          onBlur={() => {}}
          errorMessage={errors?.yearTax?.message}
          postfix='%'
          {...register('yearTax')}
        />
        <Input
          name='yearInterest'
          label='Pajak per tahun'
          onBlur={() => {}}
          errorMessage={errors?.yearInterest?.message}
          postfix='%'
          {...register('yearInterest')}
        />
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Total Bunga (sebelum pajak) / Bulan
          </label>
          <p>{getValues('beforeInterest')}</p>
        </div>
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Total Pajak atas Bunga
          </label>
          <p>{getValues('taxInterest')}</p>
        </div>
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Total Bunga (setelah pajak)
          </label>
          <p>{getValues('afterInterest')}</p>
        </div>
        <div className='mb-6 w-full'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Deposito Akhir
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
