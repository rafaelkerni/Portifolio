import Reactotron, { openInEditor, asyncStorage   } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

const tron = Reactotron
 .configure({ host: '192.168.1.150' })
 .useReactNative({
    networking: { // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/
    },
    editor: true, // there are more options to editor
    errors: { veto: (stackFrame) => true }, // or turn it off with false
  })
 .use(openInEditor())
 .use(reactotronRedux())
 .use(asyncStorage())
 .use(sagaPlugin())
 .connect()

console.tron = tron

export default tron