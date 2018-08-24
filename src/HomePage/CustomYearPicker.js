import React from "react";
import PropTypes from "prop-types";

import YearPicker from "react-year-picker";

import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

class CustomYearPicker extends React.Component {
    handleCancel = () => {
        this.yearPicker.clearYear();
        this.props.onChange(null);
    };

    yearPicker = null;

    render() {
        const active = this.props.value.length ? "year-active" : "";
        return (
            <div className={`custom-year-picker ${active}`}>
                <YearPicker
                    ref={e => {
                        this.yearPicker = e;
                    }}
                    onChange={date => this.props.onChange(date)}
                    value={this.props.value}
                />
                {Boolean(this.props.value.length) && (
                    <IconButton
                        className="cancel"
                        aria-label="cancel"
                        onClick={this.handleCancel}
                    >
                        <CancelIcon />
                    </IconButton>
                )}
            </div>
        );
    }
}

CustomYearPicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default CustomYearPicker;
