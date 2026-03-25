import { useModel } from 'umi';
import { Table, Button, Form, Input, Select, Modal, notification, Popconfirm, Row, Col, InputNumber } from 'antd';
import { useState } from 'react';

export default () => {
	const { vanBang, themVanBang, suaVanBang, xoaVanBang } = useModel('thongtinvanbang');
	const { quyetDinh } = useModel('quyetdinh');
	const { cauHinhTruong } = useModel('cauhinh');
	const { tangSoVaoSo } = useModel('sovanbang');

	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [editingId, setEditingId] = useState<any>(null);

	const openModal = (record: any = null) => {
		form.resetFields();
		setEditingId(record ? record : null);
		if (record) form.setFieldsValue(record);
		setVisible(true);
	};

	const handleLuu = (values: any) => {
		if (editingId) {
			suaVanBang({ ...values, id: editingId.id, soVaoSo: editingId.soVaoSo });
			notification.success({ message: 'Cập nhật văn bằng thành công!' });
		} else {
			const qd = quyetDinh.find((q: any) => q.soQD === values.soQD);
			if (!qd) return notification.error({ message: 'Không tìm thấy Quyết định!' });

			const soVaoSoMoi = tangSoVaoSo(qd.namSo);
			if (soVaoSoMoi === -1) return notification.error({ message: `Chưa mở Sổ văn bằng cho năm ${qd.namSo}!` });

			themVanBang({ ...values, soVaoSo: soVaoSoMoi });
			notification.success({ message: `Cấp văn bằng thành công! Số vào sổ: ${soVaoSoMoi}` });
		}
		setVisible(false);
	};

	return (
		<>
			<Button type='primary' onClick={() => openModal()} style={{ marginBottom: 16 }}>
				+ Cấp văn bằng mới
			</Button>
			<Table
				dataSource={vanBang}
				rowKey='id'
				columns={[
					{ title: 'Số vào sổ', dataIndex: 'soVaoSo' },
					{ title: 'Số hiệu', dataIndex: 'soHieu' },
					{ title: 'Mã SV', dataIndex: 'maSV' },
					{ title: 'Họ tên', dataIndex: 'hoTen' },
					{ title: 'Quyết định', dataIndex: 'soQD' },
					{
						title: 'Hành động',
						render: (_: any, record: any) => (
							<>
								<Button type='link' onClick={() => openModal(record)}>
									Sửa
								</Button>
								<Popconfirm title='Xóa văn bằng này?' onConfirm={() => xoaVanBang(record.id)}>
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
				title={editingId ? 'Sửa văn bằng' : 'Cấp văn bằng mới'}
				visible={visible}
				onOk={() => form.submit()}
				onCancel={() => setVisible(false)}
				width={600}
			>
				<Form form={form} layout='vertical' onFinish={handleLuu}>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='soHieu' label='Số hiệu' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='soQD' label='Quyết định TN' rules={[{ required: true }]}>
								<Select
									options={quyetDinh?.map((q: any) => ({ label: q.soQD, value: q.soQD }))}
									disabled={!!editingId}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='maSV' label='Mã SV' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='hoTen' label='Họ tên' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<hr style={{ margin: '15px 0' }} />
					<p>
						<b>Các trường động:</b>
					</p>
					<Row gutter={16}>
						{cauHinhTruong.map((truong: any) => (
							<Col span={12} key={truong.id}>
								<Form.Item name={`dynamic_${truong.id}`} label={truong.tenTruong}>
									{truong.kieuDuLieu === 'Number' ? (
										<InputNumber style={{ width: '100%' }} />
									) : truong.kieuDuLieu === 'Date' ? (
										<Input type='date' style={{ width: '100%' }} />
									) : (
										<Input />
									)}
								</Form.Item>
							</Col>
						))}
					</Row>
				</Form>
			</Modal>
		</>
	);
};
