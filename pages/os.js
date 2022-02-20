import React, { useState } from 'react'
import Head from 'next/head'
import OSError from '../util/OSError'

import LoadingScreen from '../components/screens/LoadingScreen'
import SetupScreen from '../components/screens/SetupScreen'
import ErrorScreen from '../components/screens/ErrorScreen'
import StartScreen from '../components/screens/StartScreen'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return <ErrorScreen error={this.state.error} />
    }

    return this.props.children
  }
}

function OS() {
  const [state, setState] = useState(null)

  function getComponent() {
    if (state === null) {
      return LoadingScreen
    }

    if (state === 'setup') {
      return SetupScreen
    }

    if (state === 'start') {
      return StartScreen
    }

    throw new OSError('UNEXPECTED_OS_STATE', { state })
  }

  const Component = getComponent()

  return (
    <>
      <Head>
        <title>LoopyOS</title>
      </Head>

      <Component setState={setState} />
    </>
  )
}

export default function () {
  return (
    <ErrorBoundary>
      <OS />
    </ErrorBoundary>
  )
}
