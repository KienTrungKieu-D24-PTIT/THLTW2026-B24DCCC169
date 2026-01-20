import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, message, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// 1. Define Data Type
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// 2. Initial Mock Data [cite: 28-33]
const initialData: Product[] = [
  { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
  { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
  { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
  { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

const ProductManager: React.FC = () => {
  // State Management [cite: 26]
  const [products, setProducts] = useState<Product[]>(initialData);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 3. Search Logic (Realtime) 
  // Filter products based on search text (case insensitive) [cite: 22]
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 4. Handle Add Product
  const handleAdd = (values: any) => {
    const newProduct: Product = {
      id: Date.now(), // Generate a temporary unique ID
      name: values.name,
      price: values.price,
      quantity: values.quantity,
    };
    
    setProducts([...products, newProduct]);
    message.success('Thêm sản phẩm thành công'); 
    setIsModalOpen(false);
    form.resetFields();
  };

  // 5. Handle Delete Product
  const handleDelete = (id: number) => {
    const newProductList = products.filter((item) => item.id !== id);
    setProducts(newProductList);
    message.success('Xóa sản phẩm thành công'); 
  };

  // 6. Table Columns [cite: 6]
  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => `${text.toLocaleString()} VND`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Product) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => handleDelete(record.id)}
          okText="Có"
          cancelText="Không"
        >
          {/* [cite: 17, 18] */}
          <Button danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách sản phẩm</h2>
      
      {/* Search and Add Bar */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        {/* [cite: 21] */}
        <Input.Search
          placeholder="Tìm kiếm sản phẩm..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Thêm sản phẩm
        </Button>
      </div>

      {/* Product Table [cite: 5] */}
      <Table 
        dataSource={filteredProducts} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }}
      />

      {/* Add Product Modal [cite: 9] */}
      <Modal
        title="Thêm sản phẩm mới"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          {/* Validation Rules [cite: 11-14] */}
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[
              { required: true, message: 'Vui lòng nhập giá!' },
              { type: 'number', min: 1, message: 'Giá phải là số dương!' } // [cite: 13]
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Nhập giá" formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}/>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng!' },
              { type: 'number', min: 1, message: 'Số lượng phải là số nguyên dương!' } // [cite: 14]
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Nhập số lượng" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManager;