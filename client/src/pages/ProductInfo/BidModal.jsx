import { Form, Input, message, Modal } from 'antd'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { PlaceNewBid } from '../../apicalls/products';
import { AddNotification } from '../../apicalls/notifications';

function BidModal({showBidModal, setShowBidModal, product, reloadData}) {
  const { user } = useSelector((state) => state.users);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const rules = [{ required: true, message: "required"}];

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if(response.success){
        message.success("Bids added successfully");
        //send notification
        await AddNotification({
          title: "New bid has been placed",
          message: `A new bid has been placed on your product ${product.name} by ${user.name} for $ ${values.bidAmount}`,
          user: product.seller._id,
          onClick: `/profile`,
          read: false,
        });
        reloadData();
        setShowBidModal(false);
      }else{
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  };


  return (
    <Modal onCancel={() => setShowBidModal(false)} open={showBidModal} centered width={600} onOk={() => formRef.current.submit()}>
        <div className="flex flex-col gap-5 mb-5">
          <h1 className="text-2xl font-semibold text-green-800 text-center">
            New Bid
          </h1>

          <Form layout="vartical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
                <Input/>
              </Form.Item>

              <Form.Item label="Message" name="message" rules={rules}>
                <Input.TextArea />
              </Form.Item>

              <Form.Item label="Mobile" name="mobile" rules={rules}>
                <Input type='number' />
              </Form.Item>
          </Form>
        </div>
    </Modal>
  )
}

export default BidModal;