import React from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import TextField from "@material-ui/core/TextField";

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
                <FormControl fullWidth>
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
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="select-multiple">Model</InputLabel>
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
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    name="year"
                    label="Year"
                    type="text"
                    onChange={this.props.handleInput}
                    value={this.props.data.year}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="price"
                    label="Price"
                    type="text"
                    onChange={this.props.handleInput}
                    value={this.props.data.price}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="owner"
                    label="Owner"
                    type="text"
                    onChange={this.props.handleInput}
                    value={this.props.data.owner}
                    fullWidth
                />
            </div>
        );
    }
}

CreateForm.propTypes = {
    makes: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    handleInput: PropTypes.func.isRequired,
    data: PropTypes.shape({
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired
    }).isRequired
};

const mapStateToProps = state => ({
    makes: Object.values(getAllCarMakes(state)),
    models: Object.values(getAllCarModels(state))
});

export default connect(mapStateToProps)(CreateForm);
