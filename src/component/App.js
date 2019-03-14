import React, { Component } from 'react'
import Film from './Film'
import Films from './Films'
import OrderBy from "./OrderBy";

class App extends Component {

    state = {
        film: null,
        loading: false,
        orderBy: 1
    }

    onOrderChanged = (e) => {
        this.setState({
            orderBy: parseInt(e.currentTarget.value)
        })
    }

    reset = () => {
        this.setState({film: null})
    }

    updateFilmId = (filmUrl) => {
        this.setState({loading: true})
        this.props.Films.getFilm(filmUrl).then((film) => {
            this.setState({film: film, loading: false})
        })
    }

    render() {
        return (
            <div>
                <div className="mt-3">
                    <Films
                        swapi={this.props.Films}
                        updateFilmId={(e) => this.updateFilmId(e)}
                        orderBy={this.state.orderBy}
                    />
                    {
                        this.state.film &&
                        <Film
                            title="Film"
                            reset={this.reset}
                            film={this.state.film}
                            species={this.props.Species}
                            characters={this.props.Characters}
                        />
                    }
                </div>
                <div className="mt-2">
                    <OrderBy
                        onOrderChanged={this.onOrderChanged}
                        checked={this.state.orderBy}
                    />
                </div>
            </div>
        )
    }
}

export default App