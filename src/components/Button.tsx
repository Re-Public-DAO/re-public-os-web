import { PropsWithChildren, FC, HTMLAttributes, } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {}

const Button: FC<Props> = ({
                             children,
                             className='',
                             ...props
}) => {
  return (
    <button
      className={'bg-blue-900 text-white font-bold rounded px-3 py-2' + ' ' + className}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
