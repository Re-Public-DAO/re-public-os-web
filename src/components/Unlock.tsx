import { FC, HTMLAttributes, useState, } from 'react'
import { Field, Form }                   from 'react-final-form'
import { ValidationErrors }                       from 'final-form'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

type Props = HTMLAttributes<HTMLFormElement> & {}

const Unlock: FC<Props> = ({
   children,
   className='',
   ...props
}) => {

  const [isSubmitting, setIsSubmitting,] = useState(false,)

  const router = useRouter()

  const handleSubmitExternal = async ({username, password, secret}): Promise<any> => {
    console.log('submitting', username, password, secret)
    if (!secret) {
      return
    }

    setIsSubmitting(true,)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/system/unlock/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        secret,
      }),
      credentials: 'include',
    })

    if (!res.ok) {
      console.log('Error submitting secret')
      return {
        secret: 'Error submitting secret'
      }
    }

    const data = await res.json()

    console.log(data)

    setIsSubmitting(false,)
    router.push('/apps')
  }

  const validate = ({username, password, secret}): ValidationErrors => {

    const errors = {}

    if (!username) {
      errors.username = 'A username is required'
    }

    if (!password) {
      errors.password = 'A password is required'
    }

    if (!secret) {
      errors.secret = 'A secret is required'
    }

    return errors

  }

  return (
    <>
      <p className={'text-center max-w-md mb-12'}>Choose a username and password. Then enter the <span className={'font-mono font-bold bg-gray-100 rounded px-1 py-1'}>secret</span> provided in your Re-Public account to unlock your cloud</p>
          <Form
      onSubmit={handleSubmitExternal}
      validate={validate}
    >
      {
        ({handleSubmit,}) => (
          <form
            className={'flex flex-col bg-gray-100 rounded-md p-4 max-w-md w-full font-manrope ' + className}
            onSubmit={handleSubmit}
            {...props}
          >
            <Field name={'username'}>
              {
                ({input, meta}) => (
                  <div className={'flex flex-col mb-3'}>
                    <label className={'text-sm font-bold text-gray-400'}>Username</label>
                    <input
                      className={'border border-gray-300 rounded-md p-2'}
                      type={'text'}
                      {...input}
                    />
                    {
                      meta.error && meta.touched && (
                        <span className={'text-red-500'}>{meta.error}</span>
                      )
                    }
                  </div>
                )
              }
            </Field>
            <Field name={'password'}>
              {
                ({input, meta}) => (
                  <div className={'flex flex-col mb-3'}>
                    <label className={'text-sm font-bold text-gray-400'}>Password</label>
                    <input
                      className={'border border-gray-300 rounded-md p-2'}
                      type={'password'}
                      {...input}
                    />
                    {
                      meta.error && meta.touched && (
                        <span className={'text-red-500'}>{meta.error}</span>
                      )
                    }
                  </div>
                )
              }
            </Field>
            <Field name={'secret'}>
              {
                ({input, meta}) => (
                  <div className={'flex flex-col mb-3'}>
                    <label className={'text-sm font-bold text-gray-400'}>Secret</label>
                    <input
                      className={'border border-gray-300 rounded-md p-2'}
                      type={'password'}
                      {...input}
                    />
                    {
                      meta.error && meta.touched && (
                        <span className={'text-red-500'}>{meta.error}</span>
                      )
                    }
                  </div>
                )
              }
            </Field>
            <Button
              className={'mt-3'}
              role={'submit'}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Unlocking...' : 'Unlock'}
            </Button>
          </form>
        )
      }
    </Form>
    </>

  )
}

export default Unlock
