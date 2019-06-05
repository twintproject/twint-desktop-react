import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { esConnect } from '../actions/AppActions'

interface State {
  redirect: boolean
}

class Form extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = event => {
    event.preventDefault()
    esConnect(
      event.target[0].value,
      event.target[1].value,
      event.target[2].value,
      event.target[3].value,
      event.target[4].value,
      '100',
      '1s',
    )
    this.setState({
      redirect: true,
    })
  }
  render() {
    return (
      <div className="form-container">
        <h2>Elastic Form</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" id="esProto" placeholder="Protocol" />
          <input type="text" id="esHost" placeholder="Hostname" />
          <input type="text" id="esPort" placeholder="Port" />
          <input type="text" id="esIndex" placeholder="Index" />
          <input type="text" id="esType" placeholder="Type" />
          <button id="connector">Connect</button>
        </form>
        {this.state.redirect && <Redirect to="/template" />}
      </div>
    )
  }
}

export default Form
