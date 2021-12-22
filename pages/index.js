import React, { useState, useEffect } from "react";

import { Table, Button, Divider, Input } from "antd";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  apiGetProduct,
  apiGetProductBySku,
  apiDeleteProduct,
} from "../services/api";

import Cookies from "js-cookie";

import ModalForm from "../components/modalForm";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [dataBySku, setDataBySku] = useState({});
  const [sku, setSku] = useState("");

  const isToken = Cookies.get("token");
  const [isModalVisible, setIsModalVisible] = useState({
    show: false,
    data: undefined,
    type: "edit",
  });

  const handleGetProduct = async () => {
    try {
      const result = await apiGetProduct();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProductBySku = async () => {
    try {
      const payload = { sku };
      const result = await apiGetProductBySku(payload, isToken);
      setDataBySku(result);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleDeleteProduct = async () => {
    try {
    } catch (error) {}
  };

  const columns = [
    {
      title: "Sku",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Action",
      key: "action",
      render: (value) => (
        <span>
          <Button
            type="link"
            onClick={() =>
              setIsModalVisible({ show: true, data: value, type: "edit" })
            }
            disabled={!isToken}
          >
            Edit
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => console.log("hey")}
            disabled={!isToken}
            danger
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    router.reload();
  };

  useEffect(() => {
    handleGetProduct();
  }, [isModalVisible]);

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          paddingBottom: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Input
          value={sku}
          style={{ width: "50%" }}
          onChange={(e) => setSku(e.target.value)}
          disabled={!isToken}
        />
        <Button onClick={handleGetProductBySku}>Search</Button>
        {!isToken ? (
          <div>
            <Link href="/register" passHref>
              <Button type="primary">Register</Button>
            </Link>
            <Link href="/login" passHref>
              <Button type="link" style={{ marginLeft: 5 }}>
                Login
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => setIsModalVisible({ show: true, type: "add" })}
              type="primary"
              danger
            >
              Add
            </Button>
            <Button
              onClick={handleLogout}
              type="link"
              style={{ marginLeft: 50 }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
      <Table dataSource={sku === "" ? data : dataBySku} columns={columns} />
      {isModalVisible.show && (
        <ModalForm
          data={isModalVisible.data}
          visible={isModalVisible.show}
          type={isModalVisible.type}
          onCancel={() => setIsModalVisible({ show: !isModalVisible })}
        />
      )}
    </div>
  );
}
