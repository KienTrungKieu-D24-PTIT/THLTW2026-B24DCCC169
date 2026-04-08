import { useModel } from 'umi';
import {
	Table,
	Button,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
	notification,
	Popconfirm,
	Row,
	Col,
	Upload,
} from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default () => {
	const { diemDens, themDiemDen, suaDiemDen, xoaDiemDen } = useModel('diemden');
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	const openModal = (record: any = null) => {
		form.resetFields();
		setEditingId(record ? record.id : null);
		if (record) {
			form.setFieldsValue({
				...record,
				anUong: record.chiPhi.anUong,
				diChuyen: record.chiPhi.diChuyen,
				luuTru: record.chiPhi.luuTru,
				hinhAnh: record.hinhAnh ? [{ uid: '-1', name: 'anh-diem-den', status: 'done', url: record.hinhAnh }] : [],
			});
		}
		setVisible(true);
	};

	const handleLuu = (values: any) => {
		let imgUrl = '';
		if (values.hinhAnh && values.hinhAnh.length > 0) {
			const fileObj = values.hinhAnh[0].originFileObj;
			if (fileObj) {
				imgUrl = URL.createObjectURL(fileObj);
			} else if (values.hinhAnh[0].url) {
				imgUrl = values.hinhAnh[0].url;
			}
		}

		const duLieuSua = {
			...values,
			hinhAnh: imgUrl,
			chiPhi: { anUong: values.anUong, diChuyen: values.diChuyen, luuTru: values.luuTru },
		};

		if (editingId) suaDiemDen({ ...duLieuSua, id: editingId });
		else themDiemDen(duLieuSua);

		notification.success({ message: 'Lưu điểm đến thành công!' });
		setVisible(false);
	};

	const columns = [
		{ title: 'Tên địa điểm', dataIndex: 'ten' },
		{ title: 'Loại hình', dataIndex: 'loaiHinh' },
		{ title: 'Đánh giá', dataIndex: 'danhGia' },
		{
			title: 'Hành động',
			render: (_: any, r: any) => (
				<>
					<Button type='link' onClick={() => openModal(r)}>
						Sửa
					</Button>
					<Popconfirm title='Xóa?' onConfirm={() => xoaDiemDen(r.id)}>
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
			<Button type='primary' onClick={() => openModal()} style={{ marginBottom: 16 }}>
				+ Thêm điểm đến mới
			</Button>
			<Table dataSource={diemDens} rowKey='id' columns={columns} scroll={{ x: 600 }} />

			<Modal
				title={editingId ? 'Sửa điểm đến' : 'Thêm điểm đến'}
				visible={visible}
				onOk={() => form.submit()}
				onCancel={() => setVisible(false)}
				width={600}
			>
				<Form form={form} layout='vertical' onFinish={handleLuu} initialValues={{ danhGia: 5 }}>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='ten' label='Tên điểm đến' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='loaiHinh' label='Loại hình' rules={[{ required: true }]}>
								<Select>
									<Option value='Biển'>Biển</Option>
									<Option value='Núi'>Núi</Option>
									<Option value='Thành phố'>Thành phố</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item name='danhGia' label='Đánh giá (Sao)'>
								<InputNumber min={1} max={5} style={{ width: '100%' }} />
							</Form.Item>
						</Col>

						{/* COMPONENT UPLOAD ẢNH MỚI NẰM Ở ĐÂY */}
						<Col span={8}>
							<Form.Item
								name='hinhAnh'
								label='Tải ảnh lên'
								valuePropName='fileList'
								getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
							>
								<Upload beforeUpload={() => false} listType='picture' maxCount={1}>
									<Button>+ Chọn file</Button>
								</Upload>
							</Form.Item>
						</Col>

						<Col span={8}>
							<Form.Item name='thoiGianThamQuan' label='TG tham quan (giờ)'>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<p>
								<b>Chi phí dự kiến (VNĐ):</b>
							</p>
						</Col>
						<Col span={8}>
							<Form.Item name='anUong' label='Ăn uống' rules={[{ required: true }]}>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item name='diChuyen' label='Di chuyển' rules={[{ required: true }]}>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item name='luuTru' label='Lưu trú' rules={[{ required: true }]}>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};
