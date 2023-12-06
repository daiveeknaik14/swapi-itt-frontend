import { Card, Form, Input, Select, Button, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { AddUser } from "../../apicalls/users"; // Assuming you have an API call function for adding users
import { SetLoader } from "../../redux/loadersSlice";

function AddUsers() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await AddUser(values); // Assuming AddUser is your API call function
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        form.resetFields();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-start items-center pt-20">
      <Card title="Add User" bordered={false} style={{ width: 300 }}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the name!",
                type: "name",
              },
            ]}
          >
            <Input type="name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input the email!",
                type: "email",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select the role!" }]}
          >
            <Select placeholder="Select a role">
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AddUsers;
