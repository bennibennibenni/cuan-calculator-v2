import { HeroCard } from '../components/HeroCard'

import { useNavigate } from 'react-router-dom'

export const MoneyManagement = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='grid md:px-12 lg:px-auto px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:mt-24 mt-[-130pxs] max-w-[1200px] mx-auto'>
        <HeroCard
          title='Deposit'
          desc='Calculate returns on fixed deposits based on interest rates and tenure.'
          icon='🏦'
          onClick={() => {
            navigate('/money-management/deposit')
          }}
        />
        <HeroCard
          title='Cashback'
          desc='Track and estimate cashback rewards from purchases and spending.'
          icon='🎁'
          onClick={() => {
            navigate('/money-management/cashback')
          }}
        />
        <HeroCard
          title='Retirement'
          desc='Plan and calculate savings for retirement, including growth projections.'
          icon='🛠️'
          onClick={() => {
            navigate('/money-management/retirement')
          }}
        />
      </div>
      {/* <ContactForm /> */}
    </div>
  )
}
