import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import PropTypes from "prop-types";

import CreateForm from "./CreateForm";

import { getAllCarMakes, getAllCarModels } from "../_reducers/";

class FormDialog extends React.Component {
    state = {
        data: {
            make: "",
            model: "",
            year: "",
            price: "",
            owner: ""
        }
    };

    handleInput = e => {
        e.persist();
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [e.target.name]: e.target.value
            }
        }));
    };

    handleCreate = () => {
        const data = { ...this.state.data };
        data.make = this.props.makes.find(
            m => m.name === this.state.data.make
        ).uuid;
        data.model = this.props.models.find(
            m => m.name === this.state.data.model
        ).uuid;
        this.props.handleCreate(data);
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    className="add-car-dialog"
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Add new car
                    </DialogTitle>
                    <DialogContent>
                        <CreateForm
                            handleInput={this.handleInput}
                            data={this.state.data}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.props.handleClose}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreate} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

FormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    makes: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
};

const mapStateToProps = state => ({
    makes: Object.values(getAllCarMakes(state)),
    models: Object.values(getAllCarModels(state))
});

export default connect(mapStateToProps)(FormDialog);
