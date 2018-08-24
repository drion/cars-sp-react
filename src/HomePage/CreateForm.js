import React from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import YearPicker from "react-year-picker";

import { getAllCarMakes, getAllCarModels } from "../_reducers/";

class CreateForm extends React.Component {
    chooseModels = () => {
        const { makes, models } = this.props;
        const make = makes.find(m => m.name === this.props.data.make);
        return models.filter(m => m.make === make.uuid);
    };

    render() {
        const { makes } = this.props;
        let models = [];
        if (this.props.data.make.length) models = this.chooseModels();

        return (
            <div>
                <FormControl
                    error={this.props.errors.make}
                    fullWidth
                    margin="dense"
                >
                    <InputLabel htmlFor="select-multiple">Make</InputLabel>
                    <Select
                        value={this.props.data.make}
                        onChange={this.props.handleInput}
                        name="make"
                        input={<Input id="select-multiple" />}
                        fullWidth
                    >
                        {makes.map(make => (
                            <MenuItem key={make.uuid} value={make.name}>
                                {make.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText id="make-error-text">
                        {this.props.errors.make}
                    </FormHelperText>
                </FormControl>

                <FormControl
                    error={this.props.errors.model}
                    fullWidth
                    margin="dense"
                >
                    <InputLabel htmlFor="select-model">Model</InputLabel>
                    <Select
                        value={this.props.data.model}
                        onChange={this.props.handleInput}
                        name="model"
                        input={<Input id="select-multiple" />}
                        fullWidth
                        disabled={
                            !(
                                this.props.data.make &&
                                this.props.data.make.length
                            )
                        }
                    >
                        {models.map(model => (
                            <MenuItem key={model.uuid} value={model.name}>
                                {model.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText id="model-error-text">
                        {this.props.errors.model}
                    </FormHelperText>
                </FormControl>

                <FormControl
                    error={this.props.errors.year}
                    aria-describedby="year-text"
                    fullWidth
                    margin="dense"
                >
                    <p className="year-label">Year</p>
                    <YearPicker
                        id="year"
                        onChange={this.props.handleDateChange}
                        value={this.props.data.year}
                        name="year"
                    />

                    <FormHelperText id="year-error-text">
                        {this.props.errors.year}
                    </FormHelperText>
                </FormControl>

                <FormControl
                    error={this.props.errors.price}
                    aria-describedby="price-text"
                    fullWidth
                    margin="dense"
                >
                    <InputLabel htmlFor="price">Price</InputLabel>
                    <Input
                        id="price"
                        value={this.props.data.price}
                        onChange={this.props.handleInput}
                        name="price"
                    />

                    <FormHelperText id="price-error-text">
                        {this.props.errors.price}
                    </FormHelperText>
                </FormControl>

                <FormControl
                    error={this.props.errors.owner}
                    aria-describedby="owner-text"
                    fullWidth
                    margin="dense"
                >
                    <InputLabel htmlFor="owner">Owner</InputLabel>
                    <Input
                        id="owner"
                        value={this.props.data.owner}
                        onChange={this.props.handleInput}
                        name="owner"
                    />

                    <FormHelperText id="owner-error-text">
                        {this.props.errors.owner}
                    </FormHelperText>
                </FormControl>
            </div>
        );
    }
}

CreateForm.propTypes = {
    makes: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    handleInput: PropTypes.func.isRequired,
    handleDateChange: PropTypes.func.isRequired,
    data: PropTypes.shape({
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        owner: PropTypes.string,
        price: PropTypes.string,
        year: PropTypes.string,
        model: PropTypes.string,
        make: PropTypes.stringm
    }).isRequired
};

const mapStateToProps = state => ({
    makes: Object.values(getAllCarMakes(state)),
    models: Object.values(getAllCarModels(state))
});

export default connect(mapStateToProps)(CreateForm);
