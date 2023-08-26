import { useInstalledConnectors, }  from '@/utils/connectors'
import Button                       from '@/components/Button'
import { useAppDispatch, }          from '@/utils'
import { updateIsAddingConnector, } from '@/redux/slices/app'
import PageContainer                from '@/components/PageContainer'
import { useEffect, }               from 'react'

const Connectors = () => {

  const dispatch = useAppDispatch()

  const { installedConnectors, mutate, } = useInstalledConnectors()

  useEffect(() => {
    mutate()
  }, [],)

  const handleAddConnectorClick = (): void => {
    dispatch(updateIsAddingConnector(true,),)
  }

  return (
    <PageContainer>
      <h1 className={'font-bold text-2xl mb-5'}>Connectors</h1>
      <div
        className={'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8'}
      >
        {
          installedConnectors &&
          installedConnectors.length > 0 &&
          installedConnectors.map((installedConnector,) => (
            <div
              key={installedConnector.republic_id}
            >
            </div>

          ),)
        }
      </div>
      {
        (
          !installedConnectors ||
            installedConnectors.length === 0
        ) && (
          <p className={'text-gray-400 mb-5'}>No connectors installed</p>

        )
      }
      <Button
        onClick={handleAddConnectorClick}
      >
        Add Connector
      </Button>
    </PageContainer>
  )
}

export default Connectors
