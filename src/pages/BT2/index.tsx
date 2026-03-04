import { useModel } from 'umi';
import { Card, Table, Button, Tag, Modal, Form, Input, InputNumber, notification, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title } = Typography;

const QuanLyHocTap = () => {
	const { lichSuHocTap, luuVaoLocalStorage } = useModel('hoctap');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	const handleThem = (values: any) => {
		const moi = { ...values, id: Date.now().toString() };
		luuVaoLocalStorage([...lichSuHocTap, moi]);
		notification.success({ message: 'Đã thêm ghi chép thành công!' });
		setIsModalOpen(false);
		form.resetFields();
	};

	const columns = [
		{ title: 'Môn học', dataIndex: 'tenMon', key: 'tenMon' },
		{ title: 'Ngày học', dataIndex: 'ngayHoc', key: 'ngayHoc' },
		{ title: 'Thời lượng', dataIndex: 'thoiLuong', render: (t: number) => <Tag color='blue'>{t} phút</Tag> },
		{ title: 'Nội dung', dataIndex: 'noiDung', key: 'noiDung' },
		{
			title: 'Hành động',
			render: (_: any, record: any) => (
				<Button
					danger
					type='link'
					icon={<DeleteOutlined />}
					onClick={() => {
						luuVaoLocalStorage(lichSuHocTap.filter((i) => i.id !== record.id));
					}}
				>
					Xóa
				</Button>
			),
		},
	];

	return (
		<Card title='Bài 2: Quản lý tiến độ học tập'>
			<div style={{ marginBottom: 16, textAlign: 'right' }}>
				<Button type='primary' icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
					Thêm bài học
				</Button>
			</div>
			<Table dataSource={lichSuHocTap} columns={columns} rowKey='id' />
			<Modal
				title='Thêm ghi chép'
				visible={isModalOpen}
				onOk={() => form.submit()}
				onCancel={() => setIsModalOpen(false)}
			>
				<Form form={form} layout='vertical' onFinish={handleThem}>
					<Form.Item name='tenMon' label='Tên môn' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='ngayHoc' label='Ngày học' rules={[{ required: true }]}>
						<Input type='date' />
					</Form.Item>
					<Form.Item name='thoiLuong' label='Thời lượng (phút)' rules={[{ required: true }]}>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='noiDung' label='Nội dung'>
						<Input.TextArea />
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default QuanLyHocTap;
