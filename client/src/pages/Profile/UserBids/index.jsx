import {message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { GetAllBids } from '../../../apicalls/products';
import moment from 'moment';


function UserBids() {
    const [bidsData, setBidsData] = useState([]);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.users);

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllBids({
                buyer: user._id,
            });
            dispatch(SetLoader(false));
            if(response.success){
                setBidsData(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Product",
            dataIndex: "product",
            render: (text, record) => {
                return record.product.name;
            }
        },
        {
            title: "Seller",
            dataIndex: "seller",
            render: (text, record) => {
                return record.seller.name;
            }
        },
        {
            title: "Offered Price",
            dataIndex: "offeredPrice",
            render: (text, record) => {
                return record.product.price;
            }
        },
        {
            title: "Bid Amount",
            dataIndex: "bidAmount",
        },
        {
            title: "Bid Date",
            dataIndex: "createdAt",
            render : (text, record) => {
                return moment(text).format("MMM Do YYYY, h:mm a");
            },
        },
        {
            title: "Message",
            dataIndex: "message",
        },
        {
            title: "Contact Details",
            dataIndex: "contactDetails",
            render: (text, record) => {
                return(
                    <div>
                        <p>Phone: {record.mobile}</p>
                        <p>Email: {record.buyer.email}</p>
                    </div>
                )
            }
        },
    ];

    useEffect(() => {
        getData();
    }, []);

  return (
    
    <div className="flex gap-3 flex-col">
        <Table columns={columns} dataSource={bidsData} rowKey="_id"/>
    </div>
    
  );
}

export default UserBids;