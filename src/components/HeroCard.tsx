interface Props {
  title: string
  desc: string
  icon: string
  onClick: void
}

export const HeroCard = (props: Props): any => {
  return (
    <div
      onClick={props.onClick}
      className='rounded-xl bg-grey-800 p-4 flex gap-y-4 flex-wrap bg-hero-card shadow-xl ring-2  hover:ring-offset-blue-500 cursor-pointer'
    >
      <div className='p-4 rounded-xl w-fit bg-hero-card-icon'>{props.icon}</div>
      <div className='w-full font-bold'>{props.title}</div>
      <div className='w-full font-[500] text-sm text-gray-400'>
        {props.desc}
      </div>
    </div>
  )
}
