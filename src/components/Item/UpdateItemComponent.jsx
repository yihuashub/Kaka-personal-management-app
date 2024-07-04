import React, {Component} from 'react'
import ItemService from '../../services/ItemService';

class UpdateItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            itemName: '',
            itemCategory: '',
            itemLocation: ''
        }
        this.changeItemNameHandler = this.changeItemNameHandler.bind(this);
        this.changeItemCategoryHandler = this.changeItemCategoryHandler.bind(this);
        this.changeItemLocationHandler = this.changeItemLocationHandler.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    componentDidMount() {
        ItemService.getItemById(this.state.id).then((res) => {
            let item = res.data;
            this.setState({
                itemName: item.itemName,
                itemCategory: item.itemCategory,
                itemLocation: item.itemLocation
            });
        });
    }

    updateItem = (e) => {
        e.preventDefault();
        let item = {name: this.state.name, category: this.state.category, location: this.state.location};
        console.log('item => ' + JSON.stringify(item));
        console.log('id => ' + JSON.stringify(this.state.id));
        ItemService.updateItem(item, this.state.id).then(res => {
            this.props.history.push('/items');
        });
    }

    changeItemNameHandler = (event) => {
        this.setState({itemName: event.target.value});
    }

    changeItemCategoryHandler = (event) => {
        this.setState({itemCategory: event.target.value});
    }

    changeItemLocationHandler = (event) => {
        this.setState({itemLocation: event.target.value});
    }

    cancel() {
        this.props.history.push('/items');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Items</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Item Name: </label>
                                        <input placeholder="Item Name" name="name" className="form-control"
                                               value={this.state.itemName} onChange={this.changeItemNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Category: </label>
                                        <input placeholder="Category" name="category" className="form-control"
                                               value={this.state.itemCategory}
                                               onChange={this.changeItemCategoryHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Location: </label>
                                        <input placeholder="Email Address" name="location" className="form-control"
                                               value={this.state.itemLocation}
                                               onChange={this.changeItemLocationHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateItem}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px"}}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default UpdateItemComponent
