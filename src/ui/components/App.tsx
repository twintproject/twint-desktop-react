import * as React from 'react'
import Sidebar from './Sidebar'

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="container">
        <Sidebar />
        <div className="main" style={{ height: window.innerHeight }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
