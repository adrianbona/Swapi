import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'

import App from './component/App'

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
