import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// Import useModel từ umi
import { useModel } from 'umi'; 

const ProductManager: React.FC = () => {
  // 1. Gọi dữ liệu từ Model 'BT01.sanpham'
  // Lưu ý: Namespace thường là tên thư mục + tên file. 
  // Nếu namespace 'BT01.sanpham' không chạy, hãy thử đổi thành 'sanpham'
  const { products, addProduct, deleteProduct } = useModel('BT01.sanpham');

  // State UI (chỉ dùng cho giao diện, không cần đưa vào model)
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Logic tìm kiếm (vẫn giữ ở client để render nhanh)
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Xử lý thêm mới
  const handleAdd = (values: any) => {
    const newProduct = {
      id: Date.now(),
      name: values.name,
      price: values.price,
      quantity: values.quantity,
    };
    
    // Gọi hàm từ model
    addProduct(newProduct);
    
    message.success('Thêm sản phẩm thành công');
    setIsModalOpen(false);
    form.resetFields();
  };

  const bienthamchieuForm = Form.useForm
  // Xử lý xóa
  const handleDelete = (id: number) => {
    // Gọi hàm từ model
    deleteProduct(id);
    message.success('Xóa sản phẩm thành công');
  };

  // ... (Phần Columns và Return giữ nguyên như cũ)
  const columns = [
    { title: 'STT', key: 'index', render: (_: any, __: any, index: number) => index + 1 },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (text: number) => `${text?.toLocaleString()} VND` },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Popconfirm title="Xóa?"
         onConfirm={() => handleDelete(record.id)} //tao bien 
         okText="Có" 
         cancelText="Không">
          <Button danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách sản phẩm (Dữ liệu từ Model)</h2>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="Tìm kiếm..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Thêm sản phẩm
        </Button>
      </div>

      <Table dataSource={filteredProducts} columns={columns} rowKey="id" />

      <Modal
        title="Thêm sản phẩm mới"
        visible={isModalOpen} // Dùng visible cho antd v4
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} 
         layout="vertical" 
         onFinish={handleAdd}>

          <Form.Item name="name"
           label="Tên sản phẩm" 
           rules={[{ required: true }]}>
             <Input />
          </Form.Item>

          <Form.Item name="price" label="Giá" 
          rules={[{ required: true }]}>
             <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="quantity" 
          label="Số lượng" 
          rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default ProductManager;