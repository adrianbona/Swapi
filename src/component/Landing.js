import React, {Component, Fragment} from 'react'
import * as PropTypes from 'prop-types'
import * as immutable from 'immutable'

import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import withStyles from '@material-ui/core/styles/withStyles'

import {getFilm, getFilms} from '../services/Films'
import FilmDetailsModal from './FilmDetailsModal'
import Footer from './Footer'
import Main from './Main'

const styles = theme => ({
    appBar: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
    },
})

class Landing extends Component {
    state = {
        film: null,
        films: null,
        loading: false,
        orderBy: '1',
    }

    componentDidMount = () => {
        getFilms().then((films) => {
            this.setState({
                films: immutable.fromJS(films.results).sort(this.compare)
            })
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.orderBy !== this.state.orderBy) {
            getFilms().then((films) => {
                this.setState({
                    films: immutable.fromJS(films.results).sort(this.compare)
                })
            })
        }
    }

    updateFilmId = (filmUrl) => {
        this.setState({loading: true})
        getFilm(filmUrl).then((film) => {
            this.setState({film: film, loading: false})
        })
    }

    onOrderChanged = (e) => {
        this.setState({
            films: null,
            orderBy: e.currentTarget.value
        })
    }

    reset = () => {
        this.setState({film: null})
    }

    compare = (a, b) => {
        if (this.state.orderBy === '1') {
            if (a.get('release_date') > b.get('release_date')) return 1
            if (b.get('release_date') > a.get('release_date')) return -1
        } else {
            if (a.get('episode_id') > b.get('episode_id')) return 1
            if (b.get('episode_id') > a.get('episode_id')) return -1
        }
        return 0
    }

    render = () => {
        const {classes} = this.props
        const {films, film, orderBy} = this.state

        return (
            <Fragment>
                <CssBaseline/>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Swapi Test
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Main orderBy={orderBy} films={films} updateFilmId={this.updateFilmId} onOrderChanged={this.onOrderChanged}/>
                {
                    <Dialog onClose={this.reset} aria-labelledby="customized-dialog-title" open={!!film}>
                        <FilmDetailsModal film={film} reset={this.reset}/>
                    </Dialog>
                }
                <Footer/>
            </Fragment>
        )
    }
}

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Landing)
