import React from "react";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import PropTypes from "prop-types";

import CreateForm from "./CreateForm";

const FormDialog = props => (
    <div>
        <Dialog
            open={props.open}
            className="add-car-dialog"
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add new car</DialogTitle>
            <DialogContent>
                <CreateForm />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);

FormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default FormDialog;
