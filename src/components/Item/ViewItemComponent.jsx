import React, {Component} from 'react'
import ItemService from '../../services/ItemService'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CardMedia} from "@mui/material";
import defaultItemIcon from '../../assets/default_item_icon.png';
import Stack from "@mui/material/Stack";

class ViewItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            item: []
        }
    }

    componentDidMount() {
        ItemService.getItemById(this.state.id).then(res => {
            this.setState({item: res.data});
        })
    }

    render() {
        return (
            <Stack container spacing={3}>
                <Card sx={{maxWidth: 345}}>
                    <CardMedia
                        sx={{height: 140}}
                        image={defaultItemIcon}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {this.state.item.itemName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {(this.state.item.itemCategory) ? this.state.item.itemCategory.itemCategoryName : '未分类'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {this.state.item.itemLocation}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Stack>

        )
    }
}

export default ViewItemComponent
