import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  app: {
    height: '50vh',
  },
  header: {
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#282c34',
  },
  editor: {
    height: '50vh',
  },
}));

function App() {
  const [count, setCount] = useState(0)
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates/.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
      <div id="monaco-editor-embed" className={classes.editor}>

      </div>
    </div>
  )
}

export default App
