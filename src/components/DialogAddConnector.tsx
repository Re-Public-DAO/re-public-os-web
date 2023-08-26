import { FC, }                             from 'react'
import Dialog                              from '@/components/Dialog'
import { useAppDispatch, useAppSelector, } from '@/utils'
import {
  selectApp,
  updateIsAddingConnector,
}                                                         from '@/redux/slices/app'
import { useAvailableConnectors, } from '@/utils/connectors'
import ConnectorSearchBox          from '@/components/ConnectorSearchBox'
import AvailableConnectorListItem  from '@/components/AvailableConnectorListItem'

type Props = {}

const DialogAddConnector: FC<Props> = () => {

  const { availableConnectors, } = useAvailableConnectors()

  const { isAddingConnector, } = useAppSelector(selectApp,)

  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(updateIsAddingConnector(false,),)
  }

  return (
    <Dialog
      show={isAddingConnector}
      onClose={handleClose}
    >
      <h3>Browse</h3>
      <ConnectorSearchBox />
      <div
        className={'mt-5'}
      >
        {
          availableConnectors &&
            availableConnectors.length > 0 &&
            availableConnectors.map((connector,) => (
              <AvailableConnectorListItem
                key={connector.id}
                connector={connector}
              />

            ),)
        }
      </div>
    </Dialog>
  )
}

export default DialogAddConnector
