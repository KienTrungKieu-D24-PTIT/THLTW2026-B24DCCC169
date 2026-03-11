import { useModel } from 'umi';
import { Card, Table, Tag, Tabs, Button, Modal, Form, Input, Select, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { TabPane } = Tabs;
const QuanLyDeThiCoBan = () => {
	const { monHoc, khoiKienThuc, nganHangCauHoi, themCauHoi } = useModel('nganhang');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	const handleThemCauHoi = (values: any) => {
		themCauHoi({ ...values, id: Date.now().toString() });
		notification.success({ message: 'Thêm câu hỏi thành công!' });
		setIsModalVisible(false);
		form.resetFields();
	};
	const columnsCauHoi = [
		{ title: 'Môn học', dataIndex: 'maMon', key: 'maMon' },
		{ title: 'Khối kiến thức', dataIndex: 'khoiKienThuc', key: 'khoiKienThuc' },
		{
			title: 'Độ khó',
			dataIndex: 'doKho',
			render: (doKho: string) => {
				let color = doKho === 'Dễ' ? 'green' : doKho === 'Trung bình' ? 'blue' : 'red';
				return <Tag color={color}>{doKho}</Tag>;
			},
		},
		{ title: 'Nội dung câu hỏi', dataIndex: 'noiDung', key: 'noiDung' },
	];

	return (
		<Card title='Bài 2: Hệ thống quản lý ngân hàng câu hỏi'>
			<Tabs defaultActiveKey='1'>
				<TabPane tab='Ngân hàng câu hỏi' key='1'>
					<div style={{ marginBottom: 16, textAlign: 'right' }}>
						<Button type='primary' icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
							Thêm câu hỏi
						</Button>
					</div>
					<Table
						dataSource={nganHangCauHoi}
						rowKey='id'
						columns={[
							{ title: 'Môn học', dataIndex: 'maMon' },
							{ title: 'Khối KT', dataIndex: 'khoiKienThuc' },
							{ title: 'Độ khó', dataIndex: 'doKho', render: (v: string) => <Tag color='blue'>{v}</Tag> },
							{ title: 'Nội dung', dataIndex: 'noiDung' },
						]}
					/>
				</TabPane>

				<TabPane tab='Danh mục môn học' key='2'>
					<Table
						dataSource={monHoc}
						rowKey='ma'
						columns={[
							{ title: 'Mã môn', dataIndex: 'ma' },
							{ title: 'Tên môn', dataIndex: 'ten' },
							{ title: 'Số tín chỉ', dataIndex: 'tinChi' },
						]}
					/>
				</TabPane>
			</Tabs>

			<Modal
				title='Thêm câu hỏi mới'
				visible={isModalVisible}
				onOk={() => form.submit()}
				onCancel={() => setIsModalVisible(false)}
			>
				<Form form={form} layout='vertical' onFinish={handleThemCauHoi}>
					<Form.Item name='maMon' label='Môn học' rules={[{ required: true }]}>
						<Select options={monHoc.map((m) => ({ label: m.ten, value: m.ma }))} />
					</Form.Item>
					<Form.Item name='khoiKienThuc' label='Khối kiến thức' rules={[{ required: true }]}>
						<Select options={khoiKienThuc.map((k) => ({ label: k, value: k }))} />
					</Form.Item>
					<Form.Item name='doKho' label='Độ khó' rules={[{ required: true }]}>
						<Select
							options={[
								{ label: 'Dễ', value: 'Dễ' },
								{ label: 'Trung bình', value: 'Trung bình' },
								{ label: 'Khó', value: 'Khó' },
							]}
						/>
					</Form.Item>
					<Form.Item name='noiDung' label='Nội dung câu hỏi' rules={[{ required: true }]}>
						<Input.TextArea rows={3} />
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default QuanLyDeThiCoBan;
