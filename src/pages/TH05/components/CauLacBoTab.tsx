import { useModel } from 'umi';
import { Table, Button, Form, Input, Modal, notification, Switch, Popconfirm } from 'antd';
import { useState } from 'react';

export default () => {
	const { clbs, themCLB, suaCLB, xoaCLB } = useModel('caulacbo');
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [editingId, setEditingId] = useState<any>(null);

	const handleLuu = (values: any) => {
		if (editingId) suaCLB({ ...values, id: editingId });
		else themCLB(values);
		notification.success({ message: 'Lưu thành công!' });
		setVisible(false);
	};

	const columns = [
		{ title: 'Ảnh', dataIndex: 'anh', render: (a: string) => <span style={{ fontSize: 24 }}>{a}</span> },
		{ title: 'Tên CLB', dataIndex: 'ten', sorter: (a: any, b: any) => a.ten.localeCompare(b.ten) },
		{
			title: 'Ngày TL',
			dataIndex: 'ngayThanhLap',
			sorter: (a: any, b: any) => new Date(a.ngayThanhLap).getTime() - new Date(b.ngayThanhLap).getTime(),
		},
		{ title: 'Chủ nhiệm', dataIndex: 'chuNhiem' },
		{ title: 'Hoạt động', dataIndex: 'hoatDong', render: (v: boolean) => <Switch checked={v} disabled /> },
		{
			title: 'Hành động',
			render: (_: any, r: any) => (
				<>
					<Button
						type='link'
						onClick={() => {
							setEditingId(r.id);
							form.setFieldsValue(r);
							setVisible(true);
						}}
					>
						Sửa
					</Button>
					<Popconfirm title='Xóa?' onConfirm={() => xoaCLB(r.id)}>
						<Button type='link' danger>
							Xóa
						</Button>
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<>
			<Button
				type='primary'
				onClick={() => {
					setEditingId(null);
					form.resetFields();
					setVisible(true);
				}}
				style={{ marginBottom: 16 }}
			>
				+ Thêm CLB
			</Button>
			<Table dataSource={clbs} rowKey='id' columns={columns} />
			<Modal
				title={editingId ? 'Sửa' : 'Thêm'}
				visible={visible}
				onOk={() => form.submit()}
				onCancel={() => setVisible(false)}
			>
				<Form form={form} layout='vertical' onFinish={handleLuu} initialValues={{ hoatDong: true, anh: '⭐' }}>
					<Form.Item name='ten' label='Tên CLB' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='ngayThanhLap' label='Ngày thành lập'>
						<Input type='date' />
					</Form.Item>
					<Form.Item name='anh' label='Icon đại diện'>
						<Input />
					</Form.Item>
					<Form.Item name='chuNhiem' label='Chủ nhiệm'>
						<Input />
					</Form.Item>
					<Form.Item name='moTa' label='Mô tả (HTML)'>
						<Input.TextArea />
					</Form.Item>
					<Form.Item name='hoatDong' label='Đang hoạt động' valuePropName='checked'>
						<Switch />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
