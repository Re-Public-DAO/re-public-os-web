import { FC, HTMLAttributes, } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {}

const PageContainer: FC<Props> = ({ children, ...props },) => {
  return (
    <div
      className={'page-container'}
      {...props}
    >
      {children}
    </div>
  )

}

export default PageContainer
