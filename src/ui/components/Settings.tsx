import * as React from 'react'

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {},
    }
  }
  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      settings: {
        maxHashtags: event.target[0].value,
        maxUsers: event.target[1].value,
        frameLess: event.target[2].value,
      },
    })
  }
  render() {
    return (
      <div className="form-container">
        <h2>Settings</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" id="maxHashtags" placeholder="Max Hashtags" />
          <input type="text" id="maxUsers" placeholder="Max Users" />
          <input type="text" id="frameLess" placeholder="Frame less" />
          <button id="connector">Apply</button>
        </form>
      </div>
    )
  }
}

export default Settings
