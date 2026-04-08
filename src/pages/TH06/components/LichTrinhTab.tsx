import { useModel } from 'umi';
import { Table, Button, Card, Row, Col, Statistic, Popconfirm } from 'antd';

export default () => {
	const { lichTrinh, xoaKhoiLichTrinh, tinhTongChiPhi } = useModel('lichtrinh');

	// Hàm chuyển chuỗi DD/MM/YYYY thành mã thời gian chuẩn để bảng sắp xếp từ cũ đến mới
	const parseDate = (dateStr: string) => {
		if (!dateStr) return 0;
		const parts = dateStr.split('/');
		if (parts.length !== 3) return 0;
		return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
	};

	// Sắp xếp lịch trình theo Ngày
	const lichTrinhSorted = [...lichTrinh].sort((a: any, b: any) => parseDate(a.ngay) - parseDate(b.ngay));

	const columns = [
		// Bỏ chữ "Ngày" mặc định đi, in thẳng chuỗi ngày tháng ra cho đẹp
		{ title: 'Ngày đi', dataIndex: 'ngay', render: (n: string) => <b>{n}</b> },
		{ title: 'Điểm đến', dataIndex: 'ten' },
		{ title: 'Thời gian (giờ)', dataIndex: 'thoiGianThamQuan' },
		{
			title: 'Tổng chi phí (VNĐ)',
			render: (_: any, r: any) => (r.chiPhi.anUong + r.chiPhi.diChuyen + r.chiPhi.luuTru).toLocaleString(),
		},
		{
			title: 'Hành động',
			render: (_: any, r: any) => (
				<Popconfirm title='Xóa điểm này?' onConfirm={() => xoaKhoiLichTrinh(r.idLich)}>
					<Button danger type='link'>
						Xóa
					</Button>
				</Popconfirm>
			),
		},
	];

	const tongThoiGian = lichTrinh.reduce((sum: number, item: any) => sum + item.thoiGianThamQuan, 0);

	return (
		<>
			<Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
				<Col xs={24} sm={12}>
					<Card>
						<Statistic title='Tổng thời gian di chuyển & tham quan' value={`${tongThoiGian} giờ`} />
					</Card>
				</Col>
				<Col xs={24} sm={12}>
					<Card>
						<Statistic
							title='Dự toán ngân sách hiện tại'
							value={`${tinhTongChiPhi().toLocaleString()} VNĐ`}
							valueStyle={{ color: '#cf1322' }}
						/>
					</Card>
				</Col>
			</Row>
			<Table dataSource={lichTrinhSorted} columns={columns} rowKey='idLich' pagination={false} scroll={{ x: 600 }} />
		</>
	);
};
