import * as React from 'react'
import Helmet from 'react-helmet-async'
import GetApi from './GetApi'
import Stringify from './Stringify'

const query = `
  query MessageList {
    MessageList {
      id
      message
    }
  }`

const Main = () => (
  <div>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h3>Home</h3>
    <GetApi query={query} autoFetch={false}>
      {({
        error,
        loading,
        refresh,
        data,
      }) => {
        if (error !== null) console.error(error)
        return (
          <div>
            <button type="button" onClick={refresh}>
              Reload
            </button>
            {loading && <div>loading...</div>}
            {Stringify(data)}
          </div>
        )
      }}
    </GetApi>
  </div>
)

export default Main
