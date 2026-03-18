import { useModel } from 'umi';
import {
	Card,
	Table,
	Tabs,
	Button,
	Form,
	Input,
	Select,
	Tag,
	notification,
	Modal,
	Statistic,
	Row,
	Col,
	InputNumber,
} from 'antd';
import { useState } from 'react';

const { TabPane } = Tabs;

const QuanLyDatLich = () => {
	const { dichVu, themDichVu, suaDichVu, xoaDichVu } = useModel('dichvu');
	const { nhanVien, themNhanVien, suaNhanVien, xoaNhanVien } = useModel('nhanvien');
	const { lichHen, datLichMoi, capNhatTrangThai } = useModel('datlich');

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	const [isModalNVVisible, setIsModalNVVisible] = useState(false);
	const [editingNV, setEditingNV] = useState<any>(null);
	const [formNV] = Form.useForm();

	const [isModalDVVisible, setIsModalDVVisible] = useState(false);
	const [editingDV, setEditingDV] = useState<any>(null);
	const [formDV] = Form.useForm();

	const handleLuuDichVu = (values: any) => {
		if (editingDV) {
			suaDichVu({ ...values, id: editingDV.id });
			notification.success({ message: 'Cập nhật dịch vụ thành công!' });
		} else {
			themDichVu(values);
			notification.success({ message: 'Thêm dịch vụ thành công!' });
		}
		setIsModalDVVisible(false);
		setEditingDV(null);
		formDV.resetFields();
	};

	const moFormThemDV = () => {
		setEditingDV(null);
		formDV.resetFields();
		setIsModalDVVisible(true);
	};

	const moFormSuaDV = (record: any) => {
		setEditingDV(record);
		formDV.setFieldsValue(record);
		setIsModalDVVisible(true);
	};

	const handleLuuNhanVien = (values: any) => {
		if (editingNV) {
			suaNhanVien({ ...values, id: editingNV.id });
			notification.success({ message: 'Cập nhật nhân viên thành công!' });
		} else {
			themNhanVien(values);
			notification.success({ message: 'Thêm nhân viên thành công!' });
		}
		setIsModalNVVisible(false);
		setEditingNV(null);
		formNV.resetFields();
	};

	const moFormThemNV = () => {
		setEditingNV(null);
		formNV.resetFields();
		setIsModalNVVisible(true);
	};

	const moFormSuaNV = (record: any) => {
		setEditingNV(record);
		formNV.setFieldsValue(record);
		setIsModalNVVisible(true);
	};

	const handleDatLich = (values: any) => {
		const thanhCong = datLichMoi(values);
		if (thanhCong) {
			notification.success({ message: 'Đặt lịch thành công!' });
			setIsModalVisible(false);
			form.resetFields();
		} else {
			notification.error({ message: 'Nhân viên này đã có lịch vào thời gian đó!' });
		}
	};

	const columnsNhanVien = [
		{ title: 'Tên NV', dataIndex: 'ten' },
		{ title: 'Giới hạn khách', dataIndex: 'gioiHanKhach' },
		{ title: 'Lịch làm', dataIndex: 'lichLam' },
		{
			title: 'Hành động',
			render: (_: any, record: any) => (
				<>
					<Button size='small' type='primary' onClick={() => moFormSuaNV(record)} style={{ marginRight: 8 }}>
						Sửa
					</Button>
					<Button size='small' danger onClick={() => xoaNhanVien(record.id)}>
						Xóa
					</Button>
				</>
			),
		},
	];

	const columnsDichVu = [
		{ title: 'Tên dịch vụ', dataIndex: 'ten' },
		{ title: 'Giá (VNĐ)', dataIndex: 'gia' },
		{ title: 'Thời gian (phút)', dataIndex: 'thoiGian' },
		{
			title: 'Hành động',
			render: (_: any, record: any) => (
				<>
					<Button size='small' type='primary' onClick={() => moFormSuaDV(record)} style={{ marginRight: 8 }}>
						Sửa
					</Button>
					<Button size='small' danger onClick={() => xoaDichVu(record.id)}>
						Xóa
					</Button>
				</>
			),
		},
	];

	const columnsLichHen = [
		{ title: 'Khách hàng', dataIndex: 'khachHang' },
		{ title: 'Ngày', dataIndex: 'ngay' },
		{ title: 'Giờ', dataIndex: 'gio' },
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			render: (t: string) => <Tag color={t === 'Hoàn thành' ? 'green' : t === 'Hủy' ? 'red' : 'blue'}>{t}</Tag>,
		},
		{
			title: 'Hành động',
			render: (_: any, record: any) =>
				record.trangThai === 'Chờ duyệt' && (
					<>
						<Button
							size='small'
							type='primary'
							onClick={() => capNhatTrangThai(record.id, 'Xác nhận')}
							style={{ marginRight: 8 }}
						>
							Nhận
						</Button>
						<Button size='small' danger onClick={() => capNhatTrangThai(record.id, 'Hủy')}>
							Hủy
						</Button>
					</>
				),
		},
	];

	const doanhThu = lichHen
		.filter((lh: any) => lh.trangThai === 'Hoàn thành')
		.reduce((tong: any, lh: any) => {
			const dv = dichVu?.find((d: any) => d.id === lh.idDichVu);
			return tong + (dv ? dv.gia : 0);
		}, 0);

	return (
		<Card title='Bài thực hành 03: Hệ thống Quản lý Đặt Lịch'>
			<Tabs defaultActiveKey='1'>
				<TabPane tab='1. Nhân viên & Dịch vụ' key='1'>
					<Row gutter={16}>
						<Col span={12}>
							<div style={{ marginBottom: 16, textAlign: 'right' }}>
								<Button type='primary' onClick={moFormThemNV}>
									+ Thêm Nhân viên
								</Button>
							</div>
							<Table
								dataSource={nhanVien}
								columns={columnsNhanVien}
								rowKey='id'
								title={() => <b>Danh sách Nhân viên</b>}
							/>
						</Col>
						<Col span={12}>
							<div style={{ marginBottom: 16, textAlign: 'right' }}>
								<Button type='primary' onClick={moFormThemDV}>
									+ Thêm Dịch vụ
								</Button>
							</div>
							<Table dataSource={dichVu} columns={columnsDichVu} rowKey='id' title={() => <b>Danh sách Dịch vụ</b>} />
						</Col>
					</Row>
				</TabPane>

				<TabPane tab='2. Quản lý Lịch hẹn' key='2'>
					<Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
						+ Đặt lịch mới
					</Button>
					<Table dataSource={lichHen} columns={columnsLichHen} rowKey='id' />
				</TabPane>

				<TabPane tab='3. Đánh giá dịch vụ' key='3'>
					<Table
						dataSource={lichHen.filter((lh: any) => lh.trangThai === 'Hoàn thành')}
						rowKey='id'
						columns={[
							{ title: 'Khách hàng', dataIndex: 'khachHang' },
							{
								title: 'Đánh giá (Sao)',
								dataIndex: 'danhGia',
								render: (v: any) => (v > 0 ? `${v}` : 'Chưa đánh giá'),
							},
							{ title: 'Phản hồi', dataIndex: 'phanHoi' },
						]}
					/>
				</TabPane>

				<TabPane tab='4. Thống kê & Báo cáo' key='4'>
					<Row gutter={16}>
						<Col span={8}>
							<Card>
								<Statistic title='Tổng số lịch hẹn' value={lichHen.length} />
							</Card>
						</Col>
						<Col span={8}>
							<Card>
								<Statistic
									title='Lịch đã hoàn thành'
									value={lichHen.filter((lh: any) => lh.trangThai === 'Hoàn thành').length}
									valueStyle={{ color: '#3f8600' }}
								/>
							</Card>
						</Col>
						<Col span={8}>
							<Card>
								<Statistic title='Tổng doanh thu (VNĐ)' value={doanhThu} />
							</Card>
						</Col>
					</Row>
				</TabPane>
			</Tabs>

			<Modal
				title={editingDV ? 'Sửa Dịch Vụ' : 'Thêm Dịch Vụ'}
				visible={isModalDVVisible}
				onOk={() => formDV.submit()}
				onCancel={() => setIsModalDVVisible(false)}
			>
				<Form form={formDV} layout='vertical' onFinish={handleLuuDichVu}>
					<Form.Item name='ten' label='Tên dịch vụ' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='gia' label='Giá tiền (VNĐ)' rules={[{ required: true }]}>
						<InputNumber style={{ width: '100%' }} min={0} />
					</Form.Item>
					<Form.Item name='thoiGian' label='Thời gian thực hiện (phút)' rules={[{ required: true }]}>
						<InputNumber style={{ width: '100%' }} min={5} />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title={editingNV ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}
				visible={isModalNVVisible}
				onOk={() => formNV.submit()}
				onCancel={() => setIsModalNVVisible(false)}
			>
				<Form form={formNV} layout='vertical' onFinish={handleLuuNhanVien}>
					<Form.Item name='ten' label='Tên nhân viên' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='gioiHanKhach' label='Giới hạn khách/ngày' rules={[{ required: true }]}>
						<InputNumber style={{ width: '100%' }} min={1} />
					</Form.Item>
					<Form.Item name='lichLam' label='Lịch làm việc' rules={[{ required: true }]}>
						<Input placeholder='VD: 9h-17h Thứ 2-6' />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title='Đặt lịch hẹn'
				visible={isModalVisible}
				onOk={() => form.submit()}
				onCancel={() => setIsModalVisible(false)}
			>
				<Form form={form} layout='vertical' onFinish={handleDatLich}>
					<Form.Item name='khachHang' label='Tên khách hàng' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='idDichVu' label='Dịch vụ' rules={[{ required: true }]}>
						<Select options={dichVu?.map((d: any) => ({ label: `${d.ten} (${d.gia}đ)`, value: d.id }))} />
					</Form.Item>
					<Form.Item name='idNhanVien' label='Nhân viên' rules={[{ required: true }]}>
						<Select options={nhanVien?.map((nv: any) => ({ label: nv.ten, value: nv.id }))} />
					</Form.Item>
					<Form.Item name='ngay' label='Ngày hẹn' rules={[{ required: true }]}>
						<Input type='date' />
					</Form.Item>
					<Form.Item name='gio' label='Giờ hẹn' rules={[{ required: true }]}>
						<Input type='time' />
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default QuanLyDatLich;
