import { useModel } from 'umi';
import { Table, Button, Form, Input, Select, Modal, notification, Popconfirm } from 'antd';
import { useState } from 'react';

export default () => {
	const { cauHinhTruong, themCauHinh, suaCauHinh, xoaCauHinh } = useModel('cauhinh');
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	const openModal = (record: any = null) => {
		form.resetFields();
		setEditingId(record ? record.id : null);
		if (record) form.setFieldsValue(record);
		setVisible(true);
	};

	const handleLuu = (values: any) => {
		if (editingId) suaCauHinh({ ...values, id: editingId });
		else themCauHinh(values);
		notification.success({ message: 'Lưu cấu hình thành công!' });
		setVisible(false);
	};

	return (
		<>
			<Button type='primary' onClick={() => openModal()} style={{ marginBottom: 16 }}>
				+ Thêm trường động
			</Button>
			<Table
				dataSource={cauHinhTruong}
				rowKey='id'
				columns={[
					{ title: 'Tên trường', dataIndex: 'tenTruong' },
					{ title: 'Kiểu dữ liệu', dataIndex: 'kieuDuLieu' },
					{
						title: 'Hành động',
						render: (_: any, record: any) => (
							<>
								<Button type='link' onClick={() => openModal(record)}>
									Sửa
								</Button>
								<Popconfirm title='Xóa trường này?' onConfirm={() => xoaCauHinh(record.id)}>
									<Button type='link' danger>
										Xóa
									</Button>
								</Popconfirm>
							</>
						),
					},
				]}
			/>

			<Modal
				title={editingId ? 'Sửa trường' : 'Thêm trường'}
				visible={visible}
				onOk={() => form.submit()}
				onCancel={() => setVisible(false)}
			>
				<Form form={form} layout='vertical' onFinish={handleLuu}>
					<Form.Item name='tenTruong' label='Tên trường (VD: Nơi sinh)' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='kieuDuLieu' label='Kiểu dữ liệu' rules={[{ required: true }]}>
						<Select
							options={[
								{ label: 'String', value: 'String' },
								{ label: 'Number', value: 'Number' },
								{ label: 'Date', value: 'Date' },
							]}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
