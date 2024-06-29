import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  TagOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  const menuItems = [
    {
      key: "brands",
      icon: <TagOutlined />,
      label: "Brands",
      link: "/brands",
    },
    {
      key: "watches",
      icon: <ClockCircleOutlined />,
      label: "Watches",
      link: "/watches",
    },
    {
      key: "accounts",
      icon: <UserOutlined />,
      label: "Accounts",
      link: "/accounts",
    },
  ];

  return (
    <Sider width={250} className="bg-dark">
      <div className="sidebar-header d-flex justify-content-center">
        <Link className="navbar-brand text-decoration-none text-light" to="/">
          <h2 className="h4 text-white py-3">WristWonders</h2>
        </Link>
      </div>
      <Menu mode="vertical" theme="dark" className="bg-dark">
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
