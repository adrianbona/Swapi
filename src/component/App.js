import React, { Component } from 'react'
import Film from './Film'
import Films from './Films'

class App extends Component {

    state = { film: null, loading: false, orderBy: 1 }

    onOrderChanged = (e) => {
        this.setState({
            orderBy: e.currentTarget.value
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
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="orderBy"
                            id="orderByDate"
                            value="1"
                            onChange={this.onOrderChanged}
                            checked={this.state.orderBy == 1}
                        />
                            <label className="form-check-label" htmlFor="orderByDate">
                                Order By Release Date
                            </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="orderBy"
                            id="orderByEpisode"
                            value="2"
                            onChange={this.onOrderChanged}
                            checked={this.state.orderBy == 2}
                        />
                            <label className="form-check-label" htmlFor="orderByEpisode">
                                Order By Episode Number
                            </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default App