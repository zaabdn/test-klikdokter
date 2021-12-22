import React, { useState } from "react";

import { useRouter } from "next/router";

import { Form, Input, Button, Typography } from "antd";

import { useFormik } from "formik";
import * as Yup from "yup";

import Cookies from "js-cookie";

import { apiLogin } from "../services/api";

const Login = () => {
  const { Text } = Typography;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      try {
        const result = await apiLogin(values);

        if (result?.token) {
          setErrorMessage("");
          Cookies.set("token", result.token);
          router.push("/");
          setSubmitting(false);
        } else {
          setErrorMessage(result.error || result.email[0]);
        }
        setSubmitting(false);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setSubmitting(false);
      }
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

      {errorMessage !== "" && (
        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 10,
          }}
        >
          <Text type="danger">{errorMessage}</Text>
        </Form.Item>
      )}

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

export default Login;
