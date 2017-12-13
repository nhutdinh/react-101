import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {selectPhotosFilter} from './picker.action'

const Picker = ({ value, onChange, options }) => (
    <span>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target)}
            value={value}>
            {options.map(option =>
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>)
            }
        </select>
    </span>
)

Picker.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    value: PropTypes.string
}
const mapDispatchToProps = dispatch => {
    console.log(arguments);
    return {
        onChange: (value) => {
            dispatch(selectPhotosFilter(value))
        }
    }
}
export default connect(null, mapDispatchToProps)(Picker)
