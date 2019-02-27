import React, { Component } from 'react'

class Films extends Component {

    state = { films: [] }

    componentDidMount() {
        this.props.swapi.getFilms().then((films) => {
            this.setState({
                films: films.results.sort(this.compare)
            })
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.orderBy != this.props.orderBy) {
            this.props.swapi.getFilms().then((films) => {
                this.setState({
                    films: films.results.sort(this.compare)
                })
            })
        }
    }

    compare = (a, b) => {
        if(this.props.orderBy == 1) {
            if (a.release_date > b.release_date) return 1
            if (b.release_date > a.release_date) return -1
        } else {
            if (a.episode_id > b.episode_id) return 1
            if (b.episode_id > a.episode_id) return -1
        }
        return 0;
    }

    render () {
        return (
            <div className="row">
                {this.state.films.map((film, index) => {
                    return (
                        <div className="col-md-3 col-sm-6 text-center" key={index}>
                            <a className="cursor-pointer" onClick={() => this.props.updateFilmId(film.url)}>
                                <img
                                    className="rounded"
                                    src={this.props.swapi.getThumbnail(film.episode_id)}
                                    alt={film.title}
                                />
                                <p className="font-weight-normal">{film.title}</p>
                            </a>
                        </div>
                    )}
                )}
            </div>
        )
    }
}

export default Films