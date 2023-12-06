import React, { useEffect } from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddUsers from "./AddUsers";

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== "admin" && user.role !== "owner") {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
        {user.role === "owner" && (
          <Tabs.TabPane tab="Add Users" key="3">
            <AddUsers />
          </Tabs.TabPane>
        )}
      </Tabs>
    </div>
  );
}

export default Admin;
