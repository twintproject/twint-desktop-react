import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { appSearch } from '../actions/AppActions'
import { RootState } from '../reducers'
import { connect } from 'react-redux'
import Progress from './Progress'
type Props = RootState

interface State {
  submitted: boolean
  loading: boolean
}

class Custom extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      submitted: false,
      loading: false,
    }
  }
  handleSubmit = async event => {
    event.preventDefault()
    const values = {}
    values['username'] = event.target[0].value
    values['hashtags'] = event.target[1].value
    values['tweet'] = event.target[2].value
    this.setState({
      loading: true,
    })
    await appSearch(this.props.app.client, values)
    this.setState({
      loading: false,
      submitted: true,
    })
  }
  render() {
    if (this.state.loading) {
      return <Progress />
    }
    return (
      <div className="form-container">
        <h2>Template Form</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" id="accounts" placeholder="Username" />
          <input type="text" id="hashtags" placeholder="Hashtag" />
          <input type="text" id="searchTerms" placeholder="Search Terms" />
          <button id="connector">Search</button>
        </form>
        {this.state.submitted && <Redirect to="/charts" />}
      </div>
    )
  }
}

const mapsStateToProps = (state: RootState) => state
export default connect(mapsStateToProps)(Custom)
