import React from "react";

import TextField from "@material-ui/core/TextField";

class CreateForm extends React.Component {
    state = {
        data: {}
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

    render() {
        return (
            <div>
                <TextField
                    autoFocus
                    margin="dense"
                    name="make"
                    label="Make"
                    type="text"
                    onChange={this.handleInput}
                    value={this.state.data.make}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="model"
                    label="Model"
                    type="text"
                    onChange={this.handleInput}
                    value={this.state.data.model}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="year"
                    label="Year"
                    type="text"
                    onChange={this.handleInput}
                    value={this.state.data.year}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="price"
                    label="Price"
                    type="text"
                    onChange={this.handleInput}
                    value={this.state.data.price}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="owner"
                    label="Owner"
                    type="text"
                    onChange={this.handleInput}
                    value={this.state.data.owner}
                    fullWidth
                />
            </div>
        );
    }
}

export default CreateForm;
