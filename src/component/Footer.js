import React, {Component} from 'react'
import * as PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 3,
    },
})

class Footer extends Component {
    render = () => {
        const {classes} = this.props
        return (
            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    {`Adrián Bona 2019`}
                </Typography>
            </footer>
        )
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Footer)