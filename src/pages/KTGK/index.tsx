import { Card } from 'antd';
import { useState } from 'react';
import ThanhCongCu from './components/ThanhCongCu';
import BangDonHang from './components/BangDonHang';
import ModalDonHang from './components/DonHang';
import BieuDoDoanhThu from './components/BieuDoDoanhThu';

export default () => {
	const [tuKhoa, setTuKhoa] = useState('');
	const [locTrangThai, setLocTrangThai] = useState('Tất cả');
	const [visible, setVisible] = useState(false);
	const [editingRecord, setEditingRecord] = useState(null);

	const openModal = (record: any = null) => {
		setEditingRecord(record);
		setVisible(true);
	};

	return (
		<Card title='Hệ thống Quản lý Đơn hàng'>
			<BieuDoDoanhThu />

			<ThanhCongCu setTuKhoa={setTuKhoa} setLocTrangThai={setLocTrangThai} openModal={openModal} />

			<BangDonHang tuKhoa={tuKhoa} locTrangThai={locTrangThai} openModal={openModal} />

			<ModalDonHang visible={visible} setVisible={setVisible} record={editingRecord} />
		</Card>
	);
};
