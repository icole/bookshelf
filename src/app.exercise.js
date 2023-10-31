/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import { useEffect } from 'react'
import { useAsync } from 'utils/hooks'
import { FullPageSpinner } from 'components/lib'
import * as colors from 'styles/colors'

const getUser = async () => {
  const token = await auth.getToken()
  if (token) {
    try {
      const data = await client('me', { token })
      return data.user
    } catch (error) {
      await auth.logout()
    }
  }
}

function App() {
  const { data: user, error, isIdle, isLoading, isError, run, setData } = useAsync()

  const login = form => auth.login(form).then(u => setData(u))
  const register = form => auth.register(form).then(u => setData(u))
  const logout = () => auth.logout().then(() => setData(null))

  useEffect(() => {
    run(getUser())
  }, [run])


  if (user) return <AuthenticatedApp user={user} logout={logout} />
  if (isLoading || isIdle) return <FullPageSpinner />
  if (isError) {
    return (<div
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>)
  }

  return <UnauthenticatedApp login={login} register={register} />
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
