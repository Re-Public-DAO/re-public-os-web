import { FC, }          from 'react'
import { Oauth, }       from '@/utils/connectors'
import { Field, Form, } from 'react-final-form'
import Button           from '@/components/Button'

type ConnectorOauthOptionsProps = {
  oauth: Oauth
}

const ConnectorOauthOptions: FC<ConnectorOauthOptionsProps> = ({ oauth, },) => {

  const onSubmit = (values: any,) => {
    const _update = async (): Promise<void> => {

    }

    _update()
  }

  return (
    <div className={'flex'}>
      <Form
        initialValues={{ sync_interval_minutes : oauth.sync_interval_minutes, }}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values, },) => (
          <form
            onSubmit={handleSubmit}
          >
            <div className={'flex flex-col mb-2'}>
              <label className={'text-sm text-stone-700 mb-1'}>Sync Interval in Minutes:</label>
              <Field
                name={'sync_interval_minutes'}
                className={'border border-stone-100 rounded p-2'}
                component={'input'}
                type={'number'}
                parse={(value,) => Number(value,)} // Ensuring that the value is a number
              />
            </div>
            <div>
              <Button type={'submit'} disabled={submitting || pristine}>
                Save
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default ConnectorOauthOptions
