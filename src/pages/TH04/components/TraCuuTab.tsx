import { useModel } from 'umi';
import { Table, Button, Form, Input, notification } from 'antd';
import { useState } from 'react';

export default () => {
	const { vanBang } = useModel('thongtinvanbang');
	const { tangLuotTraCuu } = useModel('quyetdinh');
	const [ketQuaTraCuu, setKetQuaTraCuu] = useState<any[]>([]);

	const handleTraCuu = (values: any) => {
		const validParams = Object.values(values).filter((v) => v !== undefined && v !== '');
		if (validParams.length < 2) return notification.warning({ message: 'Nhập ít nhất 2 tham số!' });

		const result = vanBang.filter((vb: any) => {
			let match = true;
			if (values.soHieu && vb.soHieu !== values.soHieu) match = false;
			if (values.maSV && vb.maSV !== values.maSV) match = false;
			if (values.hoTen && vb.hoTen !== values.hoTen) match = false;
			return match;
		});

		setKetQuaTraCuu(result);
		if (result.length > 0) tangLuotTraCuu(result[0].soQD);
	};

	return (
		<>
			<Form layout='inline' onFinish={handleTraCuu} style={{ marginBottom: 20 }}>
				<Form.Item name='soHieu' label='Số hiệu'>
					<Input placeholder='Nhập số hiệu...' />
				</Form.Item>
				<Form.Item name='maSV' label='Mã SV'>
					<Input placeholder='Nhập mã SV...' />
				</Form.Item>
				<Form.Item name='hoTen' label='Họ tên'>
					<Input placeholder='Nhập họ tên...' />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Tra cứu
					</Button>
				</Form.Item>
			</Form>
			<Table
				dataSource={ketQuaTraCuu}
				rowKey='id'
				columns={[
					{ title: 'Số vào sổ', dataIndex: 'soVaoSo' },
					{ title: 'Số hiệu', dataIndex: 'soHieu' },
					{ title: 'Mã SV', dataIndex: 'maSV' },
					{ title: 'Họ tên', dataIndex: 'hoTen' },
					{ title: 'Quyết định', dataIndex: 'soQD' },
				]}
			/>
		</>
	);
};
