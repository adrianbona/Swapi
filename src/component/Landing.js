import React, {Component, Fragment} from 'react'
import * as PropTypes from 'prop-types'
import * as immutable from 'immutable'
import classNames from 'classnames'

import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Dialog from '@material-ui/core/Dialog'

import {Films} from '../services/Films'
import Film from './Film'

const styles = theme => ({
    appBar: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
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
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        elevation: 2,
    },
    cardMedia: {
        paddingTop: '150%',
    },
    cardContent: {
        textAlign: 'center',
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 3,
    },
    root: {
        display: 'flex',
    },
    formControl: {
        textAlign: 'center',
        margin: theme.spacing.unit * 3,
    },
    group: {
        flexDirection: 'row',
        margin: `${theme.spacing.unit}px 0`,
    },
})

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            film: null,
            films: null,
            loading: false,
            orderBy: '1',
            service: new Films(),
        }
    }

    componentDidMount = () => {
        this.state.service.getFilms().then((films) => {
            this.setState({
                films: immutable.fromJS(films.results).sort(this.compare)
            })
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.orderBy !== this.state.orderBy) {
            this.state.service.getFilms().then((films) => {
                this.setState({
                    films: immutable.fromJS(films.results).sort(this.compare)
                })
            })
        }
    }

    onOrderChanged = (e) => {
        this.setState({
            orderBy: e.currentTarget.value
        })
    }

    updateFilmId = (filmUrl) => {
        this.setState({loading: true})
        this.state.service.getFilm(filmUrl).then((film) => {
            this.setState({film: film, loading: false})
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
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">Order Movies By</FormLabel>
                                            <RadioGroup
                                                aria-label="OrderBy"
                                                name="orderBy"
                                                className={classes.group}
                                                value={orderBy}
                                                onChange={this.onOrderChanged}>
                                                <FormControlLabel value="1" control={<Radio color="primary"/>} label="Release Date"/>
                                                <FormControlLabel value="2" control={<Radio color="primary"/>} label="Episode Number"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        <Grid container spacing={40}>
                            {films && films.map(aFilm => (
                                <Grid item key={aFilm} sm={6} md={4} lg={3}>
                                    <Card className={classes.card} onClick={() => this.updateFilmId(aFilm.get('url'))}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={this.state.service.getThumbnail(aFilm.get('episode_id'))}
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h3">
                                                {`${aFilm.get('title')}`}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h6">
                                                {`(${(new Date(aFilm.get('release_date')).getFullYear())})`}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </main>
                {
                    <Dialog onClose={this.reset} aria-labelledby="customized-dialog-title" open={!!film}>
                        <Film film={this.state.film} reset={this.reset}/>
                    </Dialog>
                }
                <footer className={classes.footer}>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        {`Adrián Bona 2019`}
                    </Typography>
                </footer>
            </Fragment>
        )
    }
}

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Landing)
