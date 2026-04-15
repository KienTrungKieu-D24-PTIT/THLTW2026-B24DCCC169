import { Modal, Form, Input, Select, Row, Col, notification } from 'antd';
import { useModel } from 'umi';
import { useEffect } from 'react';

const { Option } = Select;

export default ({ visible, setVisible, record }: any) => {
	const { dsKhachHang, dsSanPham, donHangs, themDon, suaDon } = useModel('donhang');
	const [form] = Form.useForm();
	const isEdit = !!record;

	useEffect(() => {
		if (visible) {
			if (record) form.setFieldsValue(record);
			else form.setFieldsValue({ trangThai: 'Chờ xác nhận', tongTien: 0 });
		} else {
			form.resetFields();
		}
	}, [visible, record, form]);

	const handleChonSanPham = (selectedIds: string[]) => {
		const tong = selectedIds.reduce((sum, id) => sum + (dsSanPham.find((s: any) => s.id === id)?.gia || 0), 0);
		form.setFieldsValue({ tongTien: tong });
	};

	const onFinish = (values: any) => {
		if (!isEdit && donHangs.find((d: any) => d.maDon === values.maDon)) {
			return notification.error({ message: 'Mã đơn hàng đã tồn tại!' });
		}

		isEdit ? suaDon(values) : themDon(values);
		notification.success({ message: isEdit ? 'Cập nhật thành công!' : 'Thêm mới thành công!' });
		setVisible(false);
	};

	return (
		<Modal
			title={isEdit ? 'Sửa đơn hàng' : 'Thêm đơn hàng'}
			visible={visible}
			onOk={() => form.submit()}
			onCancel={() => setVisible(false)}
			width={600}
		>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name='maDon' label='Mã ĐH' rules={[{ required: true }]}>
							<Input disabled={isEdit} placeholder='VD: DH003' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='khachHang' label='Khách hàng' rules={[{ required: true }]}>
							<Select placeholder='Chọn khách'>
								{dsKhachHang.map((k: any) => (
									<Option key={k.id} value={k.id}>
										{k.ten}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name='sanPhams' label='Sản phẩm' rules={[{ required: true }]}>
							<Select mode='multiple' placeholder='Chọn sản phẩm' onChange={handleChonSanPham}>
								{dsSanPham.map((s: any) => (
									<Option key={s.id} value={s.id}>
										{s.ten} - {s.gia.toLocaleString()}đ
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='ngayDat' label='Ngày đặt' rules={[{ required: true }]}>
							<Input type='date' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='trangThai' label='Trạng thái' rules={[{ required: true }]}>
							<Select>
								<Option value='Chờ xác nhận'>Chờ xác nhận</Option>
								<Option value='Đang giao'>Đang giao</Option>
								<Option value='Hoàn thành'>Hoàn thành</Option>
								<Option value='Hủy'>Hủy</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name='tongTien' label='Tổng tiền'>
							<Input readOnly style={{ color: 'red', fontWeight: 'bold' }} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};
