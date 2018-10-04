/* global __HOST:false __PORT:false */
import superagent from 'superagent'
import * as React from 'react'
import PropTypes from 'prop-types'

export default class GetApi extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    autoFetch: PropTypes.bool,
    initData: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    initData: null,
    autoFetch: true,
  }

  state = {
    data: this.props.initData,
    error: null,
    loading: true,
  }

  componentDidMount() {
    if (this.props.autoFetch) {
      this.makeRequest()
    }
  }

  fetchData = () => superagent.get(`http://${__HOST}:${__PORT}/api/v1${this.props.url}`)
    .then(x => x.body)

  makeRequest = () => {
    this.setState({ loading: true })
    this.fetchData()
      .then(({ status, body }) => {
        if (status === 'ok') {
          this.setState({ data: body, loading: false, error: null })
        } else throw new Error(body)
      })
      .catch(e => {
        this.setState({ error: e.message, loading: false })
        console.log(e)
      })
  }

  render() {
    const { data, error, loading } = this.state
    return this.props.children({
      refresh: this.fetchData,
      data,
      error,
      loading,
    })
  }
}
