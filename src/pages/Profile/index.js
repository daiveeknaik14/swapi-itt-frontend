// import React from "react";
// import { Tabs } from "antd";
// import Products from "./Products";
// import UserBids from "./UserBids";
// import { useSelector } from "react-redux";
// import moment from "moment";

// function Profile() {
//   const { user } = useSelector((state) => state.users);
//   return (
//     <div>
//       <Tabs defaultActiveKey="1">
//         <Tabs.TabPane tab="Products" key="1">
//           <Products />
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="My Bids" key="2">
//           <UserBids />
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="General" key="3">
//           <div className="flex flex-col w-1/3">
//             <span className="text-xl flex justify-between uppercase ">
//               Name : <span className="text-xl"> {user.name}</span>{" "}
//             </span>

//             <span className="text-xl flex justify-between">
//               Email : <span className="text-xl"> {user.email}</span>{" "}
//             </span>

//             <span className="text-xl flex justify-between uppercase ">
//               Create Account Date :{" "}
//               <span className="text-xl">
//                 {moment(user.createdAt).format("MMM D , YYYY hh:mm A")}
//               </span>{" "}
//             </span>
//           </div>
//         </Tabs.TabPane>
//       </Tabs>
//     </div>
//   );
// }

// export default Profile;

import React, { useState } from "react";
import { Tabs, Form, Input, Button, message } from "antd";
import Products from "./Products";
import UserBids from "./UserBids";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { SetUser } from "../../redux/usersSlice";
import { UpdateUser } from "../../apicalls/users";

function Profile() {
  const { user } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const response = await UpdateUser(user._id, values);
      if (response.success) {
        message.success("Profile updated successfully");
        dispatch(SetUser(response.data));
        setIsEditing(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flex flex-col w-1/3">
            <div className="text-xl flex justify-between uppercase">
              <span>Name:</span>
              <Form
                form={form}
                layout="inline"
                initialValues={{ name: user.name }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <span className="text-xl flex justify-between">
              Email: <span className="text-xl"> {user.email}</span>
            </span>

            <span className="text-xl flex justify-between uppercase">
              Create Account Date:{" "}
              <span className="text-xl">
                {moment(user.createdAt).format("MMM D , YYYY hh:mm A")}
              </span>
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
