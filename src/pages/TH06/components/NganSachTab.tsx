import { useModel } from 'umi';
import { Card, InputNumber, Button, Row, Col, Alert, Progress } from 'antd';
import { useState } from 'react';

export default () => {
	const { nganSachTong, setNganSachTong, tinhTongChiPhi, thongKeChiPhiTheoHangMuc } = useModel('lichtrinh');
	const [inputNganSach, setInputNganSach] = useState<number>(nganSachTong);

	const tongChi = tinhTongChiPhi();
	const hangMuc = thongKeChiPhiTheoHangMuc();
	const phanTramChi = Math.min((tongChi / nganSachTong) * 100, 100).toFixed(1);
	const vuotNganSach = tongChi > nganSachTong;

	return (
		<div style={{ maxWidth: 800, margin: '0 auto' }}>
			<Card title='Thiết lập ngân sách tổng' style={{ marginBottom: 20 }}>
				<InputNumber
					value={inputNganSach}
					onChange={(val) => setInputNganSach(val || 0)}
					style={{ width: 200, marginRight: 10 }}
					formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				/>
				<Button type='primary' onClick={() => setNganSachTong(inputNganSach)}>
					Cập nhật
				</Button>
			</Card>

			{vuotNganSach && (
				<Alert
					message='Cảnh báo: Bạn đã tiêu vượt mức ngân sách cho phép!'
					type='error'
					showIcon
					style={{ marginBottom: 20 }}
				/>
			)}

			<Card title='Thống kê chi tiêu'>
				<h3 style={{ color: vuotNganSach ? 'red' : 'green' }}>
					Đã chi: {tongChi.toLocaleString()} / {nganSachTong.toLocaleString()} VNĐ
				</h3>
				<Progress percent={Number(phanTramChi)} status={vuotNganSach ? 'exception' : 'active'} />

				<Row gutter={[16, 16]} style={{ marginTop: 30 }}>
					<Col xs={24} sm={8}>
						<Card type='inner' title='Ăn uống'>
							<h2 style={{ color: '#fa8c16' }}>{hangMuc.anUong.toLocaleString()}đ</h2>
						</Card>
					</Col>
					<Col xs={24} sm={8}>
						<Card type='inner' title='Di chuyển'>
							<h2 style={{ color: '#1890ff' }}>{hangMuc.diChuyen.toLocaleString()}đ</h2>
						</Card>
					</Col>
					<Col xs={24} sm={8}>
						<Card type='inner' title='Lưu trú'>
							<h2 style={{ color: '#52c41a' }}>{hangMuc.luuTru.toLocaleString()}đ</h2>
						</Card>
					</Col>
				</Row>
			</Card>
		</div>
	);
};
