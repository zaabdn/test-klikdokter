import React from "react";
import { Modal, Typography } from "antd";

const ModalConfirm = ({ visible, onClose, handleOk, message }) => {
  const { Text } = Typography;

  return (
    <Modal title="Confirm" visible={visible} onOk={handleOk} onCancel={onClose}>
      <p>Are you sure for delete this product?</p>
      {message !== "" && <Text type="danger">Error {message}</Text>}
    </Modal>
  );
};

export default ModalConfirm;
