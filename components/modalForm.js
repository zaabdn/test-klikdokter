import React, { useState } from "react";

import { Form, Input, Modal, Button, Spin, Typography } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

import { useFormik } from "formik";
import * as Yup from "yup";

import { apiAddProduct, apiEditProduct } from "../services/api";

import Cookies from "js-cookie";

const ModalForm = ({ visible, data, onCancel, type }) => {
  const isToken = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { Text } = Typography;

  const form = useFormik({
    initialValues: {
      sku: data?.sku ?? "",
      product_name: data?.product_name ?? "",
      qty: data?.qty ?? "",
      price: data?.price ?? "",
      unit: data?.unit ?? "",
      status: data?.status ?? "",
    },
    validationSchema: Yup.object().shape({
      sku: Yup.string().required("Sku is required"),
      product_name: Yup.string().required("Product Name is required"),
      qty: Yup.number().required("Quantity is required"),
      price: Yup.number().required("Price is required"),
      unit: Yup.string().required("Unit is required"),
      status: Yup.number().required("Status is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      if (type === "edit") {
        await handleEdit(values);
      } else {
        await handleAdd(values);
      }
    },
  });

  const handleAdd = async (data) => {
    try {
      const result = await apiAddProduct(data, isToken);
      if (result.success === false) {
        setErrorMessage(result.message);
      } else {
        onCancel();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (data) => {
    try {
      const result = await apiEditProduct(data, isToken);
      if (result.success === false) {
        setErrorMessage(result.message);
      } else {
        onCancel();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Form Product"
      visible={visible}
      footer={[
        <Button key={0}>Cancel</Button>,
        <Button type="primary" key={1} onClick={form.handleSubmit}>
          {isLoading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          ) : (
            "OK"
          )}
        </Button>,
      ]}
      onCancel={onCancel}
    >
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Sku"
          name="sku"
          rules={[
            {
              required: true,
              message: "Please input your sku!",
            },
          ]}
        >
          <Input
            name="sku"
            // disabled={type === "edit"}
            value={form.values.sku}
            onChange={form.handleChange("sku")}
            onBlur={form.handleBlur("sku")}
            defaultValue={form.values.sku}
          />
        </Form.Item>
        <Form.Item
          label="Product Name"
          name="product_name"
          rules={[
            {
              required: true,
              message: "Please input your Product Name!",
            },
          ]}
        >
          <Input
            name="product_name"
            placeholder="Vitamin B"
            value={form.values.product_name}
            onChange={form.handleChange("product_name")}
            onBlur={form.handleBlur("product_name")}
            defaultValue={form.values.product_name}
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your price!",
            },
          ]}
        >
          <Input
            name="price"
            type="number"
            value={form.values.price}
            onChange={form.handleChange("price")}
            onBlur={form.handleBlur("price")}
            defaultValue={form.values.price}
          />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="qty"
          rules={[
            {
              required: true,
              message: "Please input your Quantity!",
            },
          ]}
        >
          <Input
            type="number"
            name="qty"
            value={form.values.qty}
            onChange={form.handleChange("qty")}
            onBlur={form.handleBlur("qty")}
            defaultValue={form.values.qty}
          />
        </Form.Item>
        <Form.Item
          label="Unit"
          name="unit"
          rules={[
            {
              required: true,
              message: "Please input your unit!",
            },
          ]}
        >
          <Input
            name="unit"
            value={form.values.unit}
            onChange={form.handleChange("unit")}
            onBlur={form.handleBlur("unit")}
            defaultValue={form.values.unit}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please input your status!",
            },
          ]}
        >
          <Input
            name="unit"
            type="number"
            value={form.values.status}
            onChange={form.handleChange("status")}
            onBlur={form.handleBlur("status")}
            defaultValue={form.values.status}
          />
        </Form.Item>
      </Form>
      <Text type="danger">Error {errorMessage}</Text>
    </Modal>
  );
};

export default ModalForm;
