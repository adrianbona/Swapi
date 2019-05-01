import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import * as immutable from 'immutable'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'

import {getThumbnail} from '../services/Films'

const styles = ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        elevation: 2,
        hover: 'hover',
    },
    cardMedia: {
        paddingTop: '150%',
    },
    cardContent: {
        textAlign: 'center',
        flexGrow: 1,
    },
})

class FilmThumbnail extends Component {
    render = () => {
        const {classes, film, updateFilmId} = this.props
        return (
            <Grid item key={film} sm={6} md={4} lg={3}>
                <Card className={classes.card} onClick={() => updateFilmId(film.get('url'))}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={getThumbnail(film.get('episode_id'))}
                        title={film.get('title')}/>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h6">
                            {`${film.get('title')}`}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h6">
                            {`(${(new Date(film.get('release_date')).getFullYear())})`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

FilmThumbnail.propTypes = {
    classes: PropTypes.object.isRequired,
    film: PropTypes.instanceOf(immutable.Map),
    updateFilmId: PropTypes.func.isRequired,
}

export default withStyles(styles)(FilmThumbnail)
