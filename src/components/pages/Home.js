import React, {Component} from "react";
import {ToastContainer, toast} from 'react-toastify';
import ApiService from "../../services/apiService";
import {NavLink} from "react-router-dom";

export default class Home extends Component {
    state = {
        navigate: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            products : [],
            product: {
                name       : "",
                size       : "",
                price      : "",
                description: "",
            },
            editable : false
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    onChangehandler = (e, key) => {
        const {product}        = this.state;
        product[e.target.name] = e.target.value;
        this.setState({product});
    };

    getProducts = async () => {
      await ApiService.get(`/product`).then(({data}) => {
          this.setState({products : data})
          this.reset();
        });
    }

    saveProduct = (e) => {
        e.preventDefault()
        ApiService.post(`/product`,this.state.product).then((response) => {
            if (response.status === 200) {
                toast.success(`Success Notification !  Product added successfully`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.getProducts();
            }
        })
            .catch((error) => {
                toast.error(`Error Notification ! ${error}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }
    editProduct = (product) => {
        this.setState({editable : true})
        this.setState({product : product})
    }
    updateProduct = (e) => {
        e.preventDefault()
        ApiService.update(`/product/${this.state.product.id}`,this.state.product).then((response) => {
            if (response.status === 200) {
                toast.success(`Success Notification !  Product Update successfully`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.getProducts();
            }
        })
            .catch((error) => {
                toast.error(`Error Notification ! ${error}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }
    deleteProduct = (id) => {
        ApiService.delete(`/product/${id}`).then((response) => {
            if (response.status === 200) {
                this.getProducts();
                toast.success(`Success Notification !  Product Deleted successfully`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        })
            .catch((error) => {
                toast.error(`Error Notification ! ${error}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }

    onLogoutHandler = () => {
        localStorage.clear();
        this.setState({
            navigate: true,
        });
    };
    reset = () => {
        this.setState({editable : false})
        this.setState({product :  {
                name       : "",
                size       : "",
                price      : "",
                description: "",
            }})
        document.getElementById('close-btn').click();
    }


    render() {
        const user       = JSON.parse(localStorage.getItem("userData"));
        const {navigate} = this.state;
        if (navigate) {
            window.location = '/sign-in'
        }
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/home">React App</NavLink>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="ms-auto d-flex">
                                <h5 className="me-4">Welcome , {user.name}</h5>
                                <button onClick={this.onLogoutHandler}
                                        className="btn btn-outline-danger btn-sm">Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>

                <div className="products-list mt-5">
                    <div className="card">
                        <div className="card-header d-flex">
                            <h6>Product List</h6>
                            <button className="btn btn-primary btn-sm ms-auto" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">+ Add Product
                            </button>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.state.products.map((product,key)=>
                                    <tr key={key}>
                                        <th scope="row">{key +1 }</th>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.size}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <button onClick={()=>this.editProduct(product)} data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal" className="btn btn-success btn-sm">Edit</button>
                                            <button onClick={()=>this.deleteProduct(product.id)} className="btn btn-danger btn-sm ms-2">Delete</button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/*        add Product*/}
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{this.state.editable ? "Edit" : "Add New"} Product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={this.reset}
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mt-5 mb-4">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" name="name"
                                           placeholder="Enter Product name"
                                           value={this.state.product.name}
                                           onChange={this.onChangehandler}/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Select Size</label>
                                    <select className="form-select" aria-label="Default select example" name="size"
                                            value={this.state.product.size}
                                            onChange={this.onChangehandler}>
                                        <option disabled>Select Size</option>
                                        <option value="sm">sm</option>
                                        <option value="md">md</option>
                                        <option value="xl">xl</option>
                                        <option value="xxl">xxl</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                                    <input type="number"
                                           name="price"
                                           placeholder="Enter Price"
                                           value={this.state.product.price}
                                           onChange={this.onChangehandler}
                                           className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="Type here..."
                                        value={this.state.product.description}
                                        onChange={this.onChangehandler}
                                        className="form-control" id="exampleInputPassword1"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="close-btn" type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.reset}>Close
                                </button>
                                { this.state.editable ? <button type="button" className="btn btn-success" onClick={this.updateProduct}>Update</button>
                                    :
                                    <button type="button" className="btn btn-primary" onClick={this.saveProduct}>Save</button>
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <ToastContainer/>
            </div>
        );
    }
}