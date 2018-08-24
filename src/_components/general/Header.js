import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import "../../_styles/Header.scss";

function ButtonAppBar() {
    return (
        <div className="root">
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="title"
                        color="inherit"
                        className="flex"
                    >
                        Car Sell Platform
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar;
