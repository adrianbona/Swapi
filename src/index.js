import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

import App from './App'

import {Swapi} from './infrastructure/Swapi'
import {Films} from './services/Films'
import {Species} from './services/Species'
import {Characters} from './services/Characters'

let swapi = new Swapi()
let films = new Films(swapi)
let species = new Species(swapi)
let characters = new Characters(swapi)

ReactDOM.render(
    <App
        Films={ films }
        Species={ species }
        Characters={characters}
    />, document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
