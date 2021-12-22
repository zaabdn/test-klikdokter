import React, { useState, useEffect } from "react";

import { Table, Button, Divider, Input, Typography } from "antd";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  apiGetProduct,
  apiGetProductBySku,
  apiDeleteProduct,
} from "../services/api";

import Cookies from "js-cookie";

import ModalForm from "../components/modalForm";
import ModalConfirm from "../components/modalConfirm";

export default function Home() {
  const router = useRouter();

  const { Search } = Input;
  const { Title } = Typography;

  const isToken = Cookies.get("token");

  const [data, setData] = useState([]);
  const [dataBySku, setDataBySku] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalVisible, setIsModalVisible] = useState({
    show: false,
    data: undefined,
    type: "edit",
  });

  const handleGetProduct = async () => {
    try {
      const result = await apiGetProduct();
      const results = result.map((row) => ({
        key: row?.id,
        ...row,
      }));
      setData(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProductBySku = async (val) => {
    try {
      if (val.length < 1) {
        setDataBySku([]);
        setErrorMessage("");
        await handleGetProduct();
      } else {
        const payload = { sku: val };
        const results = await apiGetProductBySku(payload, isToken);

        if (results.success === false) {
          setErrorMessage(results.message);
        } else {
          setErrorMessage("");
          setDataBySku([results]);
        }
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const payload = { sku: isModalVisible.data };
      const result = await apiDeleteProduct(payload, isToken);

      if (result.message === false) {
        setErrorMessage(result.message || result.error);
      } else {
        setIsModalVisible({ show: false });
      }
    } catch (error) {
      setErrorMessage(error);
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
      render: (value) => (
        <span key={value?.id}>
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
            onClick={() =>
              setIsModalVisible({
                show: true,
                type: "delete",
                data: value?.sku,
              })
            }
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
        {isToken && (
          <Search
            placeholder="input sku"
            onSearch={handleGetProductBySku}
            style={{ width: "30%" }}
          />
        )}
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

      {errorMessage === "" ? (
        <Table
          dataSource={dataBySku.length > 0 ? dataBySku : data}
          columns={columns}
        />
      ) : (
        <Title level={5}>{errorMessage}</Title>
      )}

      {isModalVisible.show && isModalVisible.type !== "delete" && (
        <ModalForm
          data={isModalVisible.data}
          visible={isModalVisible.show}
          type={isModalVisible.type}
          onCancel={() => setIsModalVisible({ show: !isModalVisible })}
        />
      )}

      {isModalVisible.show && isModalVisible.type === "delete" && (
        <ModalConfirm
          visible={isModalVisible.show}
          onClose={() => {
            setErrorMessage("");
            setIsModalVisible({ show: false });
          }}
          handleOk={handleDeleteProduct}
          message={errorMessage}
        />
      )}
    </div>
  );
}
