import * as React from 'react'
import ReactWordCloud from 'react-wordcloud'
import { connect } from 'react-redux'
import { RootState } from '../reducers'

interface Props {
  wordcloud: string
}

class WordCloud extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  computeWords = words => {
    const wordsDict = {}
    const list = [] as any
    const wordInWords = words.split(' ')
    for (const u of wordInWords) {
      if (!wordsDict[u]) {
        wordsDict[u] = 1
      } else {
        wordsDict[u]++
      }
    }
    for (const key in wordsDict) {
      if (wordsDict.hasOwnProperty(key)) {
        list.push({
          word: key,
          value: wordsDict[key],
        })
      }
    }
    return list
  }
  render() {
    const words = this.computeWords(this.props.wordcloud)
    const WORD_COUNT_KEY = 'value'
    const WORD_KEY = 'word'

    return (
      <ReactWordCloud
        words={words}
        wordCountKey={WORD_COUNT_KEY}
        wordKey={WORD_KEY}
        fontFamily={'Times, serif'}
        width={window.innerWidth - 100}
        height={window.innerHeight}
      />
    )
  }
}

const mapsStateToProps = (state: RootState) => {
  return {
    wordcloud: state.app.wordcloud,
  }
}
export default connect(mapsStateToProps)(WordCloud)
