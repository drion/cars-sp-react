import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import EnhancedTableHead from "./TableHead";
import { getAllCars } from "../_reducers/car.reducer";
import { retrieveCategory } from "../_reducers/categories.reducer";
import { retrieveCarMake } from "../_reducers/make.reducer";
import { retrieveCarModel } from "../_reducers/model.reducer";

// function getSorting(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
//     : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
// }

// const styles = theme => ({
//   root: {
//     width: "100%",
//     marginTop: theme.spacing.unit * 3
//   },
//   table: {
//     minWidth: 1020
//   },
//   tableWrapper: {
//     overflowX: "auto"
//   }
// });

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "calories",
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { cars, categories, carMakes, carModels } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const data = getAllCars(cars);
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className="table-root">
        <div className="table-wrapper">
          <Table className="table" aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={false}
                    tabIndex={-1}
                    key={n.uuid}
                    selected={false}
                  >
                    <TableCell padding="checkbox" />
                    <TableCell component="th" scope="row" padding="none">
                      {n.uuid}
                    </TableCell>
                    <TableCell numeric>
                      {retrieveCarMake(carMakes, n.make).name}
                    </TableCell>
                    <TableCell numeric>
                      {retrieveCarModel(carModels, n.model).name}
                    </TableCell>
                    <TableCell numeric>
                      {retrieveCategory(categories, n.category).name}
                    </TableCell>
                    <TableCell numeric>{n.price}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  cars: PropTypes.shape({}).isRequired,
  carModels: PropTypes.shape({}).isRequired,
  carMakes: PropTypes.shape({}).isRequired,
  categories: PropTypes.shape({}).isRequired
};

export default EnhancedTable;
