import React, { useState } from "react";

import { Form, Input, Button, Checkbox } from "antd";

import { useRouter } from "next/router";

import { useFormik } from "formik";

import * as Yup from "yup";

import { apiRegister } from "../services/api";

import { simpleEncrypt } from "../utils/simpleEncryptDecrypt";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    await apiRegister(data)
      .then((res) => {
        const isSuccess = res.success;
        if (isSuccess) {
          router.push({
            pathname: "/login",
          });
        }
      })
      .catch((err) => setError(err));
  };

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      await handleSubmit(values);
    },
  });

  return (
    <Form
      name="basic"
      style={{ marginTop: 50 }}
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 10,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          name="email"
          placeholder="zainal@gmail.com"
          value={form.values.email}
          onChange={form.handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          name="password"
          value={form.values.password}
          onChange={form.handleChange}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 16,
          span: 10,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={Object.keys(form.errors).length > 0 || isLoading}
          onClick={form.handleSubmit}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
