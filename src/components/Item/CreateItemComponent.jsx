import React, {Component} from 'react'
import ItemService from '../../services/ItemService';
import ItemCategoryService from "../../services/itemCategoryService";
import ItemContainerService from "../../services/itemContainerService";

class CreateItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            itemName: '',
            itemCategory: null,
            itemContainer: null,
            itemCategories: [],
            itemContainers: [],
            itemLocation: ''
        }
        this.changeItemNameHandler = this.changeItemNameHandler.bind(this);
        this.changeItemCategoryHandler = this.changeItemCategoryHandler.bind(this);
        this.changeItemContainerHandler = this.changeItemContainerHandler.bind(this);
        this.changeItemLocationHandler = this.changeItemLocationHandler.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id !== '_add') {
            ItemService.getItemById(this.state.id).then((res) => {
                let item = res.data;
                this.setState({
                    itemName: item.itemName,
                    itemLocation: item.itemLocation
                });
            });
        }

        ItemCategoryService.getItemCategories().then(res => {
            this.setState({itemCategories: res.data});
        })
        ItemContainerService.getContainers().then(res => {
            this.setState({itemContainers: res.data});
        })
    }

    saveOrUpdateItem = (e) => {
        e.preventDefault();
        let item = {
            itemName: this.state.itemName,
            itemCategory: this.state.itemCategory,
            itemContainer: this.state.itemContainer,
            itemLocation: this.state.itemLocation
        };
        console.log('item => ' + JSON.stringify(item));
        console.log('itemCategory => ' + JSON.stringify(this.state.itemCategory));

        // step 5
        if (this.state.id === '_add') {
            ItemService.createItem(item).then(res => {
                this.props.history.push('/items');
            });
        } else {
            ItemService.updateItem(item, this.state.id).then(res => {
                this.props.history.push('/items');
            });
        }
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    changeItemNameHandler = (event) => {
        this.setState({itemName: event.target.value});
    }

    changeItemCategoryHandler = (event) => {
        let newItemCategory = this.state.itemCategories.find(category => category.id === parseInt(event.target.value))
        this.setState({itemCategory: newItemCategory ? newItemCategory : null});
    }

    changeItemContainerHandler = (event) => {
        let newItemContainer = this.state.itemContainers.find(container => container.id === parseInt(event.target.value))
        this.setState({itemContainer: newItemContainer ? newItemContainer : null});
    }
    changeItemLocationHandler = (event) => {
        this.setState({itemLocation: event.target.value});
    }

    cancel() {
        this.props.history.push('/items');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Items</h3>
        } else {
            return <h3 className="text-center">Update Items</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Item Name: </label>
                                        <input placeholder="Item Name" name="itemName" className="form-control"
                                               value={this.state.itemName} onChange={this.changeItemNameHandler}/>
                                    </div>

                                    <div className="form-group">
                                        <label> Item Category: </label>
                                        <select className="form-control" onChange={this.changeItemCategoryHandler}>
                                            <option key="null" value="null">未分类</option>
                                            {this.state.itemCategories && this.state.itemCategories.map(category => (
                                                <option key={category.id}
                                                        value={category.id}>{category.itemCategoryName}</option>
                                            ))
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label> Item Container: </label>
                                        <select className="form-control" onChange={this.changeItemContainerHandler}>
                                            <option key="null" value="null">N/A</option>
                                            {this.state.itemContainers && this.state.itemContainers.map(container => (
                                                <option key={container.id}
                                                        value={container.id}>{container.itemContainerName}</option>
                                            ))
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label> Item Location: </label>
                                        <input placeholder="Item Location" name="itemLocation" className="form-control"
                                               value={this.state.itemLocation}
                                               onChange={this.changeItemLocationHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateItem}>Save</button>
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

export default CreateItemComponent
