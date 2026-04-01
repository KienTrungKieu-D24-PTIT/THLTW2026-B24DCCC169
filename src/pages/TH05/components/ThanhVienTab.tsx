import { useModel } from 'umi';
import { Table, Button, Modal, Select, notification } from 'antd';
import { useState } from 'react';

export default () => {
	const { dons, chuyenCLB } = useModel('dondangky');
	const { clbs } = useModel('caulacbo');

	const thanhViens = dons.filter((d) => d.trangThai === 'Approved');

	const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [newClbId, setNewClbId] = useState<string>('');

	const handleChangeCLB = () => {
		if (!newClbId) return notification.error({ message: 'Vui lòng chọn CLB chuyển đến!' });
		chuyenCLB(selectedRowKeys, newClbId);
		notification.success({ message: `Đã chuyển ${selectedRowKeys.length} thành viên sang CLB mới.` });
		setModalVisible(false);
		setSelectedRowKeys([]);
	};

	return (
		<>
			<Button
				type='primary'
				disabled={selectedRowKeys.length === 0}
				onClick={() => setModalVisible(true)}
				style={{ marginBottom: 16 }}
			>
				Đổi CLB cho {selectedRowKeys.length} thành viên đã chọn
			</Button>

			<Table
				rowSelection={{ selectedRowKeys, onChange: (keys) => setSelectedRowKeys(keys) }}
				dataSource={thanhViens}
				rowKey='id'
				columns={[
					{ title: 'Họ tên', dataIndex: 'hoTen' },
					{ title: 'Email', dataIndex: 'email' },
					{ title: 'SĐT', dataIndex: 'sdt' },
					{
						title: 'Đang sinh hoạt tại',
						dataIndex: 'clbId',
						render: (id: string) => clbs.find((c: any) => c.id === id)?.ten,
					},
				]}
			/>

			<Modal
				title={`Xác nhận đổi CLB cho ${selectedRowKeys.length} thành viên`}
				visible={modalVisible}
				onOk={handleChangeCLB}
				onCancel={() => setModalVisible(false)}
			>
				<p>Chọn CLB muốn chuyển đến:</p>
				<Select
					style={{ width: '100%' }}
					value={newClbId}
					onChange={setNewClbId}
					options={clbs.map((c) => ({ label: c.ten, value: c.id }))}
				/>
			</Modal>
		</>
	);
};
