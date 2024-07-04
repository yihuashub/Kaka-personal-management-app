import React, {Component} from 'react'
import ItemService from '../../services/ItemService'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ButtonGroup, Container, Grid} from "@mui/material";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

class ListItemsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: []
        }
        this.addItems = this.addItems.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.editItems = this.editItems.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(id) {
        ItemService.deleteItem(id).then(res => {
            this.setState({items: this.state.items.filter(item => item.id !== id)});
        });
    }

    viewItems(id) {
        this.props.history.push(`/view-item/${id}`);
    }

    editItems(id) {
        this.props.history.push(`/add-item/${id}`);
    }

    componentDidMount() {
        ItemService.getItems().then((res) => {
            this.setState({items: res.data});
        });
    }

    addItems() {
        this.props.history.push('/add-item/_add');
    }

    addCategory() {
        this.props.history.push('/add-category/_add');
    }

    render() {
        return (
            <Container maxWidth="xl">
                <Stack container spacing={3}>
                    <Grid xs={12}>
                        <h2 className="text-center">Items List</h2>
                    </Grid>
                    <Grid xs={12}>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={this.addItems}>Add Items</Button>
                            <Button variant="contained" onClick={this.addCategory}>Add Category</Button>
                            <Button variant="contained" onClick={this.addItems}>Add Box</Button>
                        </Stack>
                    </Grid>
                    <Grid xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 700}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Item Name</StyledTableCell>
                                        <StyledTableCell align="center">Item Category</StyledTableCell>
                                        <StyledTableCell align="center">Item Container</StyledTableCell>
                                        <StyledTableCell align="center">Item Location</StyledTableCell>
                                        <StyledTableCell align="right">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {
                                        this.state.items.map(
                                            item =>
                                                <StyledTableRow key={item.id}>
                                                    <StyledTableCell component="th" scope="row"
                                                                     align="center"> {item.itemName} </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {item.itemCategory ? item.itemCategory.itemCategoryName : '未分类'}
                                                    </StyledTableCell>
                                                    <StyledTableCell
                                                        align="center"> {item.itemContainer ? item.itemContainer.itemContainerName : "N/A"}</StyledTableCell>

                                                    <StyledTableCell
                                                        align="center"> {(item.itemContainer && item.itemContainer.location) ? item.itemContainer.location.locationName : "N/A"}</StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <ButtonGroup variant="contained"
                                                                     aria-label="outlined primary button group">
                                                            <Button onClick={() => this.editItems(item.id)}>Update</Button>
                                                            <Button onClick={() => this.deleteItem(item.id)}
                                                                    color="error">Delete</Button>
                                                            <Button onClick={() => this.viewItems(item.id)}
                                                                    color="info">View</Button>
                                                        </ButtonGroup>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Stack>
            </Container>
        )
    }
}

export default ListItemsComponent
