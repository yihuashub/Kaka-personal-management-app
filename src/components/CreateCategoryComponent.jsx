import React, {Component} from 'react'
import ItemCategoryService from "../services/itemCategoryService";

class CreateCategoryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            itemCategoryName: '',
        }
        this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id !== '_add') {
            ItemCategoryService.getItemById(this.state.id).then((res) => {
                let item = res.data;
                this.setState({
                    itemName: item.itemName,
                    itemLocation: item.itemLocation
                });
            });
        }
    }

    saveOrUpdateItem = (e) => {
        e.preventDefault();
        let item = {
            itemCategoryName: this.state.itemCategoryName,
        };
        console.log('item => ' + JSON.stringify(item));
        console.log('itemCategory => ' + JSON.stringify(this.state.itemCategory));

        // step 5
        if (this.state.id === '_add') {
            ItemCategoryService.createCategory(item).then(res => {
                this.props.history.push('/items');
            });
        } else {
            ItemCategoryService.updateCategory(item, this.state.id).then(res => {
                this.props.history.push('/items');
            });
        }
    }
    changeCategoryNameHandler = (event) => {
        this.setState({itemCategoryName: event.target.value});
    }

    cancel() {
        this.props.history.push('/items');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Categories</h3>
        } else {
            return <h3 className="text-center">Update Categories</h3>
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
                                        <label> Category Name: </label>
                                        <input placeholder="Category Name" name="categoryName" className="form-control"
                                               value={this.state.itemCategoryName}
                                               onChange={this.changeCategoryNameHandler}/>
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

export default CreateCategoryComponent
