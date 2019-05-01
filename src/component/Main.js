import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import * as immutable from 'immutable'
import classNames from 'classnames'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import withStyles from '@material-ui/core/styles/withStyles'

import OrderBy from './OrderBy'
import FilmThumbnail from './FilmThumbnail'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    jumbotron: {
        margin: '0 auto',
        border: '1px solid rgba(0,0,0,.6)',
        backgroundColor: '#1c1e22',
        padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 4}px`,
    },
    yellow: {
        color: '#ffe300',
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 1}px 0 ${theme.spacing.unit * 1}px`,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `0 0 ${theme.spacing.unit * 3}px`,
    },
})

class Main extends Component {
    renderThumbnails = (films) => {
        const {updateFilmId} = this.props
        return films.map((aFilm, index) => (
            <FilmThumbnail key={index} film={aFilm} updateFilmId={updateFilmId}/>
        ))
    }

    renderFilms = (films) => {
        const {classes} = this.props
        if (films) {
            return (
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        {this.renderThumbnails(films)}
                    </Grid>
                </div>
            )
        }
        return (
            <div className={classes.root}>
                <LinearProgress/>
            </div>
        )
    }

    render = () => {
        const {classes, films, orderBy, onOrderChanged} = this.props
        return (
            <main>
                <div className={classes.heroUnit}>
                    <div className={classes.jumbotron}>
                        <Typography component="h1" variant="h2" align="center" className={classes.yellow} gutterBottom>
                            SWAPI
                        </Typography>
                        <Typography variant="h6" align="center" className={classes.yellow} paragraph>
                            The Star Wars API
                        </Typography>
                    </div>
                    <div className={classes.heroContent}>
                        <div>
                            <Grid container spacing={8} justify="center">
                                <Grid item>
                                    <OrderBy onOrderChanged={onOrderChanged} orderBy={orderBy}/>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                {this.renderFilms(films)}
            </main>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
    orderBy: PropTypes.string.isRequired,
    films: PropTypes.instanceOf(immutable.List),
    onOrderChanged: PropTypes.func.isRequired,
    updateFilmId: PropTypes.func.isRequired,
}

export default withStyles(styles)(Main)