import React from 'react'

/**
 * @typedef {object} Props
 * @prop {React.Component<{error}>} fallback
 * @prop {React.Component} children
 * @prop {Function<{error,info}>} didCatch
 *
 * @extends {React.Component<Props>}
 */

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (this.props.didCatch) {
      this.props.didCatch({ error, info })
    }
  }

  render() {
    const { error } = this.state
    const { fallback: F, children } = this.props
    if (error) {
      return <F error={error.message || error} />
    }
    return children
  }
}
