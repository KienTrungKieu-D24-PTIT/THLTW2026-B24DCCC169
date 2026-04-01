import { useModel } from 'umi';
import { Table, Button, Form, Input, Modal, notification, Tag, Select, Drawer, List } from 'antd';
import { useState } from 'react';

export default () => {
	const { dons, themDon, suaDon, xoaDon, xuLyDon, lichSu } = useModel('dondangky');
	const { clbs } = useModel('caulacbo');

	const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
	const [rejectModalVisible, setRejectModalVisible] = useState(false);
	const [historyVisible, setHistoryVisible] = useState(false);
	const [rejectReason, setRejectReason] = useState('');

	const onSelectChange = (newSelectedRowKeys: any[]) => setSelectedRowKeys(newSelectedRowKeys);

	const handleApprove = () => {
		xuLyDon(selectedRowKeys, 'Approved');
		notification.success({ message: `Đã duyệt ${selectedRowKeys.length} đơn!` });
		setSelectedRowKeys([]);
	};

	const handleReject = () => {
		if (!rejectReason.trim()) return notification.error({ message: 'Bắt buộc nhập lý do từ chối!' });
		xuLyDon(selectedRowKeys, 'Rejected', rejectReason);
		notification.success({ message: `Đã từ chối ${selectedRowKeys.length} đơn!` });
		setRejectModalVisible(false);
		setRejectReason('');
		setSelectedRowKeys([]);
	};

	const columns = [
		{ title: 'Họ tên', dataIndex: 'hoTen' },
		{ title: 'CLB', dataIndex: 'clbId', render: (id: string) => clbs.find((c: any) => c.id === id)?.ten },
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			render: (t: string) => <Tag color={t === 'Approved' ? 'green' : t === 'Rejected' ? 'red' : 'orange'}>{t}</Tag>,
		},
		{ title: 'Ghi chú', dataIndex: 'ghiChu' },
	];

	return (
		<>
			<div style={{ marginBottom: 16, display: 'flex', gap: 10 }}>
				<Button type='primary' disabled={selectedRowKeys.length === 0} onClick={handleApprove}>
					Duyệt {selectedRowKeys.length} đơn
				</Button>
				<Button danger disabled={selectedRowKeys.length === 0} onClick={() => setRejectModalVisible(true)}>
					Từ chối {selectedRowKeys.length} đơn
				</Button>
				<Button onClick={() => setHistoryVisible(true)}>Xem lịch sử thao tác</Button>
			</div>

			<Table
				rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
				dataSource={dons}
				rowKey='id'
				columns={columns}
			/>

			<Modal
				title='Lý do từ chối'
				visible={rejectModalVisible}
				onOk={handleReject}
				onCancel={() => setRejectModalVisible(false)}
			>
				<Input.TextArea
					rows={4}
					value={rejectReason}
					onChange={(e) => setRejectReason(e.target.value)}
					placeholder='Nhập lý do bắt buộc...'
				/>
			</Modal>

			<Drawer
				title='Lịch sử thao tác'
				placement='right'
				onClose={() => setHistoryVisible(false)}
				visible={historyVisible}
				width={400}
			>
				<List
					dataSource={lichSu}
					renderItem={(item: any) => (
						<List.Item>
							<List.Item.Meta
								title={<b>{item.hanhDong}</b>}
								description={
									<>
										{item.thoiGian} <br /> {item.chiTiet}
									</>
								}
							/>
						</List.Item>
					)}
				/>
			</Drawer>
		</>
	);
};
