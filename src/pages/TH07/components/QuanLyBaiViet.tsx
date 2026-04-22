import { useState } from 'react';
import { useModel } from 'umi';
import { Table, Button, Space, Tag, Popconfirm, Modal, Form, Input, Select, notification } from 'antd';

const { Option } = Select;

export default () => {
	const { posts, tags, addPost, updatePost, deletePost } = useModel('blog');
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingPost, setEditingPost] = useState<any>(null);

	const openPostModal = (record: any = null) => {
		setEditingPost(record);
		if (record) form.setFieldsValue(record);
		else form.resetFields();
		setIsModalVisible(true);
	};

	const handleSavePost = (values: any) => {
		if (editingPost) {
			updatePost({ ...editingPost, ...values });
			notification.success({ message: 'Đã cập nhật bài viết!' });
		} else {
			addPost(values);
			notification.success({ message: 'Đã thêm bài viết mới!' });
		}
		setIsModalVisible(false);
	};

	const postColumns = [
		{ title: 'Tiêu đề', dataIndex: 'title', width: '30%' },
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (s: string) => <Tag color={s === 'Đã đăng' ? 'green' : 'orange'}>{s}</Tag>,
		},
		{ title: 'Thẻ', dataIndex: 'tags', render: (tgs: string[]) => tgs.map((t) => <Tag key={t}>{t}</Tag>) },
		{ title: 'Lượt xem', dataIndex: 'views' },
		{ title: 'Ngày tạo', dataIndex: 'createdAt' },
		{
			title: 'Hành động',
			render: (_: any, record: any) => (
				<Space>
					<Button type='link' onClick={() => openPostModal(record)}>
						Sửa
					</Button>
					<Popconfirm title='Chắc chắn xóa?' onConfirm={() => deletePost(record.id)}>
						<Button danger type='link'>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			<Button type='primary' onClick={() => openPostModal()} style={{ marginBottom: 16 }}>
				+ Viết bài mới
			</Button>
			<Table dataSource={posts} columns={postColumns} rowKey='id' />

			<Modal
				title={editingPost ? 'Sửa bài viết' : 'Thêm bài viết mới'}
				visible={isModalVisible}
				onOk={() => form.submit()}
				onCancel={() => setIsModalVisible(false)}
				width={800}
			>
				<Form form={form} layout='vertical' onFinish={handleSavePost} initialValues={{ status: 'Nháp' }}>
					<Form.Item name='title' label='Tiêu đề' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='slug' label='Đường dẫn (Slug)' rules={[{ required: true }]}>
						<Input placeholder='vd: bai-viet-so-1' />
					</Form.Item>
					<Form.Item name='image' label='URL Ảnh đại diện'>
						<Input placeholder='https://...' />
					</Form.Item>
					<Form.Item name='summary' label='Tóm tắt'>
						<Input.TextArea rows={2} />
					</Form.Item>
					<Form.Item name='content' label='Nội dung (hỗ trợ Markdown)' rules={[{ required: true }]}>
						<Input.TextArea rows={6} placeholder='## Tiêu đề lớn \n Nội dung...' />
					</Form.Item>
					<Form.Item name='tags' label='Gắn thẻ' rules={[{ required: true }]}>
						<Select mode='multiple'>
							{tags.map((t: any) => (
								<Option key={t.name} value={t.name}>
									{t.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name='status' label='Trạng thái'>
						<Select>
							<Option value='Nháp'>Nháp</Option>
							<Option value='Đã đăng'>Đã đăng</Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
