import { useNavigate } from 'react-router-dom'

interface Props {
  children: string
  backNavigation: string
  icon: string
  title: string
}

export const Layout = ({ children, title, backNavigation, icon }: Props) => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='md:px-12 lg:px-auto px-6 lg:mt-24 mt-[-130pxs] max-w-[1200px] mx-auto'>
        <div className='rounded-xl bg-grey-800 p-4 bg-hero-card shadow-xl ring-2  hover:ring-offset-blue-500 '>
          <div className='flex justify-between items-center '>
            <div className='p-4 rounded-xl w-fit bg-hero-card-icon cursor-pointer'>
              {icon}
            </div>
            <div className='flex-1 text-center'>
              <h1 className='text-[28px] sm:text-[28px] font-bold'>{title}</h1>
            </div>
            <div
              className='p-4 rounded-xl w-fit bg-hero-card-icon  cursor-pointer'
              onClick={() => {
                navigate(backNavigation)
              }}
            >
              ❌
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
