import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { ResetPassword } from "../../apicalls/users"; // Import your API call for password reset
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = {
  email: [
    {
      required: true,
      message: "Email is required",
      type: "email",
    },
  ],
  password: [
    {
      required: true,
      message: "Password is required",
    },
  ],
};

function Reset() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await ResetPassword(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          SWAPI-ITT - <span className="text-gray-400 text-2xl">RESET PASSWORD</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules.email}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="New Password" name="password" rules={rules.password}>
            <Input type="password" placeholder="New Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Reset Password
          </Button>

          <div className="mt-5 text-center">
            <Link to="/login" className="text-primary">
              Back to Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Reset;
