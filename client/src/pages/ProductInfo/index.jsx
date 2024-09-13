import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetAllBids, GetProductById } from "../../apicalls/products";
import { Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BidModal from "./BidModal";
import Divider from "../../components/Divider";

function ProductInfo() {
    const {user} = useSelector((state) => state.users);
    const [showAddNewBid, setShowAddNewBid] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const getData = async() => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProductById(id);
            dispatch(SetLoader(false));
            if(response.success){
                const bidsResponse = await GetAllBids({ product: id });
                setProduct({...response.data, bids: bidsResponse.data});
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
        product && <div>
            <div className="grid grid-cols-2 gap-5 mt-5">
                <div className="flex flex-col gap-5">
                    <img src={product.images[selectedImageIndex]} alt="" className="w-full h-96 object-cover rounded-mb" />

                    <div className="flex gap-5">
                        {product.images.map((image, index) => {
                            return (
                                <img className={"w-20 h-20 object-cover rounded-md cursor-pointer" + (selectedImageIndex === index? "border-2 border-green-700 border-dashed p-2" : "")}
                                onClick={() => setSelectedImageIndex(index)} alt="" src={image}/>
                            );
                        })}
                    </div>

                    <Divider />

                    <div className="text-green-800">
                        <h1>
                            Added On
                        </h1>
                        <span className="text-green-800">
                            {moment(product.createdAt).format("MMM D, YYYY hh:mm A")}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-green-800">{product.name}</h1>
                        <span>
                            {product.description}
                        </span>
                    </div>
                    <Divider />

                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold text-green-800">Product Details</h1>
                        <div className="flex justify-between">
                            <span>Price</span>
                            <span>$ {product.price}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Category</span>
                            <span className="uppercase">{product.category}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Year</span>
                            <span>{moment().subtract(product.age, "years").format("YYYY")} ({product.age} Years Ago)</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Bill Available</span>
                            <span>{product.billAvailable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Box Available</span>
                            <span>{product.boxAvailable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Accessories Available</span>
                            <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Warranty Available</span>
                            <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
                        </div>
                    </div>

                    <Divider />

                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold text-green-800">Seller Details</h1>
                        <div className="flex justify-between">
                            <span>Name</span>
                            <span>{product.seller.name}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Email</span>
                            <span>{product.seller.email}</span>
                        </div>
                    </div>

                    <Divider />
                    <div className="flex flex-col">
                        <div className="flex justify-between mb-5">
                            <h1 className="text-2xl font-semibold text-green-800">Bids</h1>
                            <Button onClick={() => setShowAddNewBid(!showAddNewBid)} disabled={user._id === product.seller._id}>
                                New Bid
                            </Button>
                        </div>

                        {product.ShowBidsOnProductPage && product?.bids?.map((bid) => {
                            return (
                                <div className="border border-gray-300 border-solid p-3 rounded mt-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Name</span>
                                        <span>{bid.buyer.name}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-700">
                                        <span>Bid Amount</span>
                                        <span>$ {bid.bidAmount}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-600">
                                        <span>Bid Place On</span>
                                        <span>{moment(bid.createdAt).format("MMM D, YYYY hh:mm A")}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {showAddNewBid && <BidModal 
            product={product} reloadData={getData} showBidModal={showAddNewBid} setShowBidModal={setShowAddNewBid}/>}
        </div>
    );
}

export default ProductInfo;