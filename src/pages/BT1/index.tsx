import React, { useState } from 'react';
import { Card, Button, Typography, Space, Table, Tag, Row, Col } from 'antd';
import { TrophyOutlined, HistoryOutlined } from '@ant-design/icons';
import './style.css';

const { Title, Text } = Typography;

const OanTuTiHienDai = () => {
	const [dangLac, setDangLac] = useState(false);
	const [luaChonCuaBan, setLuaChonCuaBan] = useState('✊');
	const [luaChonCuaMay, setLuaChonCuaMay] = useState('✊');
	const [ketQuaVuaRoi, setKetQuaVuaRoi] = useState('Sẵn sàng?');
	const [lichSu, setLichSu] = useState<any[]>([]);

	const danhSachLuaChon = [
		{ ten: 'Kéo', icon: '✌️' },
		{ ten: 'Búa', icon: '✊' },
		{ ten: 'Bao', icon: '✋' },
	];

	const choi = (banChon: any) => {
		setDangLac(true);
		setKetQuaVuaRoi('Đang oẳn tù tì...');

		setTimeout(() => {
			const mayChon = danhSachLuaChon[Math.floor(Math.random() * 3)];
			setLuaChonCuaBan(banChon.icon);
			setLuaChonCuaMay(mayChon.icon);

			let kq = '';
			if (banChon.ten === mayChon.ten) kq = 'Hòa';
			else if (
				(banChon.ten === 'Kéo' && mayChon.ten === 'Bao') ||
				(banChon.ten === 'Búa' && mayChon.ten === 'Kéo') ||
				(banChon.ten === 'Bao' && mayChon.ten === 'Búa')
			)
				kq = 'Thắng';
			else kq = 'Thua';

			setKetQuaVuaRoi(kq);
			setLichSu([
				{ nguoi: banChon.icon, may: mayChon.icon, kq: kq, thoiGian: new Date().toLocaleTimeString() },
				...lichSu,
			]);
			setDangLac(false);
		}, 800);
	};

	return (
		<Card
			title={
				<Title level={3}>
					<TrophyOutlined /> Trò chơi Oẳn Tù Tì
				</Title>
			}
			className='game-card'
		>
			<Row gutter={[32, 32]} justify='center' align='middle'>
				<Col span={8} className='player-side'>
					<Title level={4}>BẠN</Title>
					<div className={`hand-icon ${dangLac ? 'shaking' : ''}`}>{luaChonCuaBan}</div>
				</Col>

				<Col span={8} style={{ textAlign: 'center' }}>
					<Tag color='gold' style={{ fontSize: '20px', padding: '10px 20px' }}>
						VS
					</Tag>
					<div style={{ marginTop: '20px' }}>
						<Title level={2} style={{ color: ketQuaVuaRoi === 'Thắng' ? '#52c41a' : '#ff4d4f' }}>
							{ketQuaVuaRoi}
						</Title>
					</div>
				</Col>

				<Col span={8} className='player-side'>
					<Title level={4}>MÁY</Title>
					<div className={`hand-icon ${dangLac ? 'shaking' : ''}`}>{luaChonCuaMay}</div>
				</Col>
			</Row>

			<div style={{ textAlign: 'center', marginTop: '40px' }}>
				<Space size='large'>
					{danhSachLuaChon.map((item) => (
						<Button
							key={item.ten}
							size='large'
							shape='round'
							onClick={() => choi(item)}
							disabled={dangLac}
							style={{ fontSize: '24px', height: '80px', width: '80px' }}
						>
							{item.icon}
						</Button>
					))}
				</Space>
			</div>

			<Card
				title={
					<span>
						<HistoryOutlined /> Lịch sử đấu
					</span>
				}
				style={{ marginTop: '30px' }}
			>
				<Table
					dataSource={lichSu}
					pagination={{ pageSize: 5 }}
					columns={[
						{ title: 'Giờ', dataIndex: 'thoiGian' },
						{ title: 'Bạn', dataIndex: 'nguoi' },
						{ title: 'Máy', dataIndex: 'may' },
						{
							title: 'Kết quả',
							dataIndex: 'kq',
							render: (v) => <Tag color={v === 'Thắng' ? 'green' : v === 'Hòa' ? 'gold' : 'red'}>{v}</Tag>,
						},
					]}
				/>
			</Card>
		</Card>
	);
};

export default OanTuTiHienDai;
