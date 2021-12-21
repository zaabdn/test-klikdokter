import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { apiGetProduct } from "../services/api";

import React, { useState, useEffect } from "react";

import { Table, Button, Divider } from "antd";

import Cookies from "js-cookie";

export default function Home() {
  const [data, setData] = useState([]);

  const isToken = Cookies.get("token");

  const handleGetProduct = async () => {
    try {
      const result = await apiGetProduct();
      setData(result);
    } catch (error) {
      console.log(error);
    }
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
      render: () => (
        <span>
          <Button type="link" disabled={!isToken}>
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
  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <div className={styles.container}>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
