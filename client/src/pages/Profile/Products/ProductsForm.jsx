import { Col, Form, Input, message, Modal, Row, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { AddProduct, EditProduct } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loadersSlice";
import Images from "./images";


const additionalThings = [
    {
        label: "Bill available",
        name: "billAvailabel",
    },
    {
        label: "Warranty Available",
        name: "warrantyAvailable",
    },
    {
        label: "Accessories Available",
        name: "accessoriesAvailable",
    },
    {
        label: "Box Available",
        name: "boxAvailble",
    },
];

const rules = [
    {
        required: true,
        message: "Required",
    },
];


function ProductsForm({showProductForm, setShowProductForm, selectedProduct, getData}) {
    const [selectedTab = "1", setSelectedTab] = React.useState("1");
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.users);
    
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            let response= null;
            if(selectedProduct){
                response = await EditProduct(selectedProduct._id, values);
            }else{
                values.seller = user._id;
                values.status = "pending";
                response = await AddProduct(values);
            }
            dispatch(SetLoader(false));
            if(response.success){
                message.success(response.message);
                getData();
                setShowProductForm(false);
            }else{
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    const formRef = React.useRef(null);


    useEffect(() => {
        if (selectedProduct){
            formRef.current.setFieldsValue(selectedProduct);
        }
    },[selectedProduct]);
    return(
        <Modal title="" open={showProductForm} onCancel={() => setShowProductForm(false)} centered width={1000} okText="Save" onOk={() => {formRef.current.submit();}} {...(selectedTab==="2" && {footer : false})}>
            <div>
                <h1 className="text-primary txt-2xl text-center font-semibold uppercase">
                    {selectedProduct ? "Edit product" : "Add product"}
                </h1>
                <Tabs defaultActiveKey="1" activeKey={selectedTab} onChange={(key) => setSelectedTab(key)}>
                    <Tabs.TabPane tab="General" key="1">
                        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
                            <Form.Item label="Name" name="name" rules={rules}>
                                <Input type="text"/>
                            </Form.Item>
                            <Form.Item label="Description" name="description" rules={rules}>
                                <TextArea type="text"/>
                            </Form.Item>

                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item label="Price" name="price" rules={rules}>
                                        <Input type="number"/>
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Category" name="category" rules={rules}>
                                        <select>
                                            <option value="">Select</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="home">Home</option>
                                            <option value="sports">Sports</option>
                                        </select>
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Age" name="age" rules={rules}>
                                        <Input type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div className="flex gap-10">
                                {additionalThings.map((item) =>{
                                    return (<Form.Item label={item.label} name={item.name} valuePropName="checked">
                                            <Input type="checkbox" value={item.name} onChange={(e) =>{
                                                    formRef.current.setFieldsValue({
                                                        [item.name]: e.target.checked,
                                                    });
                                                }}
                                                checked={formRef.current?.getFieldValue(item.name)}
                                            />
                                        </Form.Item>
                                    );
                                })}
                            </div>

                            <Form.Item label="Show Bids on Product Page" name="ShowBidsOnProductPage" valuePropName="checked">
                                <Input type="checkbox" onChange={(e) =>{
                                    formRef.current.setFieldsValue({
                                        ShowBidsOnProductPage: e.target.checked,
                                    });
                                }}
                                checked={formRef.current?.getFieldValue("ShowBidsOnProductPage")}
                                style={{ width: 50, marginLeft: 20 }}
                                />
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="images" key="2" disabled={!selectedProduct}>
                        <Images selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} getData={getData}/>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Modal>
    );
}

export default ProductsForm;