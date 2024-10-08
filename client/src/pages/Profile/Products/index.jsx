import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { DeleteProduct, GetProducts } from "../../../apicalls/products";
import moment from "moment";
import Bids from "./Bids";


function Products() {
    const [showBids, setShowBids] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const {user} = useSelector ((state) => state.users); 
    const dispatch = useDispatch();


    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts({
                seller: user._id,
            });
            dispatch(SetLoader(false));
            if(response.success){
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    

    const columns = [
        {
            title: "Product",
            dataIndex: "image",
            key: "image",
            render: (text, record) => {
                return(
                    <img src={record?.images?.length > 0 ? record.images[0] : ""} alt="" className="w-20 h-20 object-cover rounded-md" />
                );
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text, record) =>moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, record) => {
                return (
                    <div className="flex gap-5 items-center">
                        <i className="ri-delete-bin-line"
                        onClick={() =>{ deleteProduct(record._id);}}></i>
                        <i className="ri-pencil-line" onClick={() => {
                            setSelectedProduct(record);
                            setShowProductForm(true);
                        }}></i>

                        <span className="underline cursor-pointer" onClick={() => {
                            setSelectedProduct(record);
                            setShowBids(true);
                        }}>
                            Show Bids
                        </span>
                    </div>
                )
            },
        },
    ];

    const deleteProduct = async (id) => {
        try{
            dispatch(SetLoader(true));
            const response = await DeleteProduct(id);
            dispatch(SetLoader(false));
            if(response.success) {
                message.success(response.message);
                getData();
            }else{
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return(
        <div>
            <div className="flex justify-end mb-2">
                <Button type="default" onClick={() => {
                    setSelectedProduct(null);
                    setShowProductForm(true);
                }}>
                    Add Product
                </Button>
            </div>

            <Table columns={columns} dataSource={products} rowKey="_id"/>

            {showProductForm && (
                <ProductsForm 
                showProductForm={showProductForm} 
                setShowProductForm={setShowProductForm}
                selectedProduct={selectedProduct}
                getData={getData} />
            )}

            {showBids && (
                <Bids showBidsModal={showBids} setShowBidsModal={setShowBids} selectedProduct={selectedProduct} />
            )}
        </div>
    );
};

export default Products;