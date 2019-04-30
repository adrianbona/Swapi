import React from 'react'
import ReactDOM from 'react-dom'

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import Landing from './component/Landing'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ffe300',
        },
    },
})

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Landing/>
        </MuiThemeProvider>
    )
}

ReactDOM.render(
    <App/>, document.getElementById('root')
)
