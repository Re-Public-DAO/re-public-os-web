import { PropsWithChildren, FC, HTMLAttributes, } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {}

const Button: FC<Props> = ({
  children,
  className='',
  ...props
},) => {
  return (
    <button
      className={'bg-fuchsia-500 opacity-75 text-white font-bold rounded outline-none px-3 py-2' + ' ' + className}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
