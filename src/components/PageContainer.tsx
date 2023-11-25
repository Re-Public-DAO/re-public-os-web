import { FC, HTMLAttributes, } from 'react'
import Breadcrumb              from '@/components/Breadcrumb'

type Props = HTMLAttributes<HTMLDivElement> & {}

const PageContainer: FC<Props> = ({ children, ...props },) => {
  return (
    <div
      className={'page-container px-5'}
      {...props}
    >
      <Breadcrumb />
      {children}
    </div>
  )

}

export default PageContainer
