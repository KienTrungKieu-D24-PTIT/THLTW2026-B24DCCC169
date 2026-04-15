import { Table, Space, Button, Popconfirm, Tag } from 'antd';
import { useModel } from 'umi';

export default ({ tuKhoa, locTrangThai, openModal }: any) => {
	const { donHangs, dsKhachHang, huyDon } = useModel('donhang');

	let dataHienThi = donHangs.filter((don: any) => {
		const tenKH = dsKhachHang.find((k: any) => k.id === don.khachHang)?.ten?.toLowerCase() || '';
		const matchTuKhoa = don.maDon.toLowerCase().includes(tuKhoa.toLowerCase()) || tenKH.includes(tuKhoa.toLowerCase());
		const matchTrangThai = locTrangThai === 'Tất cả' || don.trangThai === locTrangThai;
		return matchTuKhoa && matchTrangThai;
	});

	const columns = [
		{ title: 'Mã ĐH', dataIndex: 'maDon' },
		{
			title: 'Khách hàng',
			dataIndex: 'khachHang',
			render: (id: string) => dsKhachHang.find((k: any) => k.id === id)?.ten,
		},
		{
			title: 'Ngày đặt',
			dataIndex: 'ngayDat',
			sorter: (a: any, b: any) => new Date(a.ngayDat).getTime() - new Date(b.ngayDat).getTime(),
		},
		{
			title: 'Tổng tiền',
			dataIndex: 'tongTien',
			render: (t: number) => <b style={{ color: '#cf1322' }}>{t.toLocaleString()} đ</b>,
			sorter: (a: any, b: any) => a.tongTien - b.tongTien,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			render: (tt: string) => (
				<Tag color={tt === 'Hoàn thành' ? 'green' : tt === 'Hủy' ? 'red' : tt === 'Chờ xác nhận' ? 'orange' : 'blue'}>
					{tt}
				</Tag>
			),
		},
		{
			title: 'Thao tác',
			render: (_: any, record: any) => (
				<Space>
					<Button
						type='link'
						onClick={() => openModal(record)}
						disabled={record.trangThai === 'Hoàn thành' || record.trangThai === 'Hủy'}
					>
						Sửa
					</Button>

					<Popconfirm
						title='Hủy đơn hàng này?'
						onConfirm={() => huyDon(record.maDon)}
						disabled={record.trangThai !== 'Chờ xác nhận'}
					>
						<Button danger type='link' disabled={record.trangThai !== 'Chờ xác nhận'}>
							Hủy
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return <Table dataSource={dataHienThi} columns={columns} rowKey='maDon' />;
};
