import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom"

class Film extends Component {

    state = { species: [], characters: [] }

    componentDidMount() {
        this.props.film.species.map((specieUrl) => {
            this.props.species.getSpecie(specieUrl).then((specie) => {
                this.setState(prevState => ({
                    species: [...prevState.species, specie.name]
                }))
            })
        })

        this.props.film.characters.map((characterUrl) => {
            this.props.characters.getCharacter(characterUrl).then((character) => {
                this.setState(prevState => {
                    prevState.characters.push(character)
                    return {
                        characters: prevState.characters
                }})
            })
        })
    }

    renderCharacters = () => {
        return this.state.characters.map((character, index) =>
            <span className="mr-1" key={index}>
                <Link to={`/character/${index}`}>{character.name}</Link>
            </span>
        )
    }

    render() {
        return (
            <div>
                <div className="modal fade show d-block modal-open">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p className="mb-0">
                                    <b>Title</b>
                                </p>
                                <p>
                                    {this.props.film.title}
                                </p>
                                <p className="mb-0">
                                    <b>Director</b>
                                </p>
                                <p>
                                    {this.props.film.director}
                                </p>
                                <p className="mb-0">
                                    <b>Producer</b>
                                </p>
                                <p>
                                    {this.props.film.producer}
                                </p>
                                <p className="mb-0">
                                    <b>Episode</b>
                                </p>
                                <p>
                                    {this.props.film.episode_id}
                                </p>
                                <p className="mb-0">
                                    <b>Opening Crawl</b>
                                </p>
                                <p>
                                    {this.props.film.opening_crawl}
                                </p>
                                <p className="mb-0">
                                    <b>Species</b>
                                </p>
                                <p>
                                    {this.state.species.join(", ")}
                                </p>
                                <p className="mb-0">
                                    <b>Characters</b>
                                </p>
                                    <Router>
                                <p>
                                        {this.renderCharacters()}
                                </p>
                                    </Router>
                            </div>
                            <button className="btn" onClick={() => this.props.reset()}>Close</button>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show"/>
            </div>
        )
    }
}

export default Film