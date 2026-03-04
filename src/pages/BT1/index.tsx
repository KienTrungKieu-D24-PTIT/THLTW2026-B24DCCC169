import { useState } from 'react';
import { Card, Input, Button, Typography, message, Space } from 'antd';

const { Title, Text } = Typography;

const DoanSo = () => {
	const [soNgauNhien] = useState(Math.floor(Math.random() * 100) + 1);
	const [luotDoan, setLuotDoan] = useState(0);
	const [giaTri, setGiaTri] = useState<number>();
	const [thongBao, setThongBao] = useState('Hãy đoán số từ 1 đến 100');

	const kiemTra = () => {
		if (giaTri === undefined) return;
		const moi = luotDoan + 1;
		setLuotDoan(moi);

		if (giaTri === soNgauNhien) {
			message.success('Chúc mừng! Bạn đã đoán đúng!');
			setThongBao('Chính xác!');
		} else if (giaTri < soNgauNhien) {
			setThongBao('Số bạn đoán quá thấp!');
		} else {
			setThongBao('Số bạn đoán quá cao!');
		}

		if (moi >= 10 && giaTri !== soNgauNhien) {
			message.error(`Hết lượt! Số đúng là ${soNgauNhien}`);
		}
	};

	return (
		<Card title='Bài 1: Trò chơi đoán số'>
			<Title level={4}>{thongBao}</Title>
			<Text>Số lượt đã dùng: {luotDoan}/10</Text>
			<Space style={{ marginTop: 16, display: 'flex' }}>
				<Input type='number' min={1} max={100} value={giaTri} onChange={(e) => setGiaTri(Number(e.target.value))} />
				<Button type='primary' onClick={kiemTra} disabled={luotDoan >= 10}>
					Đoán
				</Button>
			</Space>
		</Card>
	);
};

export default DoanSo;
