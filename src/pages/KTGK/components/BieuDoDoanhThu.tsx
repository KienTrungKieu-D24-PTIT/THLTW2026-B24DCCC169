import { useModel } from 'umi';
import { Card, Row, Col, Statistic, Progress } from 'antd';

export default () => {
	const { donHangs } = useModel('donhang');

	const tongDoanhThuDuKien = donHangs
		.filter((d: any) => d.trangThai !== 'Hủy')
		.reduce((sum: number, item: any) => sum + item.tongTien, 0);

	const doanhThuThucTe = donHangs
		.filter((d: any) => d.trangThai === 'Hoàn thành')
		.reduce((sum: number, item: any) => sum + item.tongTien, 0);

	const phanTramThanhCong = tongDoanhThuDuKien > 0 ? (doanhThuThucTe / tongDoanhThuDuKien) * 100 : 0;

	return (
		<div style={{ marginBottom: 24 }}>
			<Row gutter={16}>
				<Col xs={24} sm={12} md={8}>
					<Card>
						<Statistic
							title='Doanh thu dự kiến (Chưa hủy)'
							value={tongDoanhThuDuKien}
							suffix='đ'
							valueStyle={{ color: '#1890ff' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={8}>
					<Card>
						<Statistic
							title='Doanh thu thực tế (Hoàn thành)'
							value={doanhThuThucTe}
							suffix='đ'
							valueStyle={{ color: '#52c41a' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={8}>
					<Card title='Tỷ lệ hoàn thành'>
						<Progress percent={Number(phanTramThanhCong.toFixed(1))} status='active' />
					</Card>
				</Col>
			</Row>

			<Card title='Biểu đồ phân bổ theo trạng thái' style={{ marginTop: 16 }}>
				<div
					style={{ display: 'flex', alignItems: 'flex-end', height: 160, gap: 20, borderBottom: '1px solid #f0f0f0' }}
				>
					{['Chờ xác nhận', 'Đang giao', 'Hoàn thành', 'Hủy'].map((tt) => {
						const tien = donHangs
							.filter((d: any) => d.trangThai === tt)
							.reduce((sum: number, item: any) => sum + item.tongTien, 0);
						const maxVal = Math.max(...donHangs.map((d: any) => d.tongTien), 1) * donHangs.length;
						const height = (tien / maxVal) * 120 + 5;
						const colors: any = {
							'Chờ xác nhận': '#faad14',
							'Đang giao': '#1890ff',
							'Hoàn thành': '#52c41a',
							Hủy: '#ff4d4f',
						};

						return (
							<div key={tt} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
								<div style={{ fontSize: 12, marginBottom: 4 }}>{tien > 0 ? `${(tien / 1000).toFixed(0)}` : ''}</div>
								<div style={{ height: height, width: '40%', backgroundColor: colors[tt], transition: 'height 0.4s' }} />
								<div style={{ marginTop: 8, fontSize: 12 }}>{tt}</div>
							</div>
						);
					})}
				</div>
			</Card>
		</div>
	);
};
