import types from '../constants/action-types'

export interface Action {
  type: string
  payload?: any
}

export interface AppState {
  client: any
  dataset: object
  geoPoints: object[]
  tweets: string[]
  wordcloud: []
  graphData: object[]
}

const initialSate: AppState = {
  client: '',
  dataset: {},
  geoPoints: [{}],
  tweets: [],
  wordcloud: [],
  graphData: [],
}

export default (state = initialSate, action: Action) => {
  switch (action.type) {
    case types.APP_ES_CONNECT: {
      return {
        ...state,
        client: action.payload.client,
      }
    }
    case types.APP_INIT_DATASET: {
      return {
        ...state,
        dataset: action.payload.totalDatasets.dataset,
        wordcloud: action.payload.tweets,
        graphData: action.payload.graphData,
        geoPoints: action.payload.geoPoints,
      }
    }
    default: {
      return state
    }
  }
}
