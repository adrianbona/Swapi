import React, {Component} from 'react'
import * as PropTypes from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'

const styles = theme => ({
    root: {
        marginBottom: 0,
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

class OrderBy extends Component {
    render = () => {
        const {classes, onOrderChanged, orderBy} = this.props
        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Order Movies By</FormLabel>
                <RadioGroup
                    aria-label="OrderBy"
                    name="orderBy"
                    className={classes.group}
                    value={orderBy}
                    onChange={onOrderChanged}>
                    <FormControlLabel value="1" className={classes.root} control={<Radio color="primary"/>} label="Release Date"/>
                    <FormControlLabel value="2" className={classes.root} control={<Radio color="primary"/>} label="Episode Number"/>
                </RadioGroup>
            </FormControl>
        )
    }
}

OrderBy.propTypes = {
    classes: PropTypes.object.isRequired,
    onOrderChanged: PropTypes.func.isRequired,
    orderBy: PropTypes.string.isRequired,
}

export default withStyles(styles)(OrderBy)
