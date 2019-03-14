import React, { Component } from 'react'

class OrderBy extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="orderBy"
                        id="orderByDate"
                        value={1}
                        onChange={(e) => this.props.onOrderChanged(e)}
                        checked={this.props.checked === 1}
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
                        value={2}
                        onChange={(e) => this.props.onOrderChanged(e)}
                        checked={this.props.checked === 2}
                    />
                        <label className="form-check-label" htmlFor="orderByEpisode">
                            Order By Episode Number
                        </label>
                </div>
            </React.Fragment>
        )
    }
}

export default OrderBy