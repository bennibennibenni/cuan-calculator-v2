import { forwardRef } from 'react'

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void

interface Props {
  title?: string
  desc?: string
  icon?: string
  onClick?: void
  label?: string
  errorMessage?: string
  prefix?: string
  postfix?: string
  onChange?: ChangeHandler
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, onChange, errorMessage, prefix, postfix }, ref) => (
    <div className='mb-6 w-full'>
      {label && (
        <label
          htmlFor='default-input'
          className='block mb-2 text-sm w-full font-bold'
        >
          {label}
        </label>
      )}
      {prefix && (
        <div className='relative w-full'>
          <div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
            {prefix}
          </div>
          <input
            className='block p-2.5 w-full z-20 ps-10 bg-hero-card border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-hero-card dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
            ref={ref}
            type='number'
            onChange={(e) => {
              if (onChange) {
                onChange(e)
              }
            }}
          />
        </div>
      )}
      {postfix && (
        <div className='relative'>
          <input
            className='bg-hero-card border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-hero-card dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full pe-10 p-2.5'
            ref={ref}
            type='number'
            pattern='^4[0-9]{12}(?:[0-9]{3})?$'
            onChange={(e) => {
              if (onChange) {
                onChange(e)
              }
            }}
          />
          <div className='absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none'>
            {postfix}
          </div>
        </div>
      )}
      {!prefix && !postfix && (
        <input
          className='bg-hero-card border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-hero-card dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full'
          ref={ref}
          type='number'
          pattern='^4[0-9]{12}(?:[0-9]{3})?$'
          onChange={(e) => {
            if (onChange) {
              onChange(e)
            }
          }}
        />
      )}
      {errorMessage && (
        <p className='text-sm w-full font-bold mt-2'>{errorMessage}</p>
      )}
    </div>
  )
)
