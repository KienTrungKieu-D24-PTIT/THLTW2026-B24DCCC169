import { useState } from 'react';

export interface CauHoi {
	id: string;
	maMon: string;
	khoiKienThuc: string;
	doKho: string;
	noiDung: string;
}

export default () => {
	const [monHoc] = useState([
		{ ma: 'INT1306', ten: 'Lập trình web', tinChi: 3 },
		{ ma: 'INT13110', ten: 'Mạng máy tính', tinChi: 3 },
	]);

	const [khoiKienThuc] = useState(['Tổng quan', 'Chuyên sâu', 'Thực hành']);
	const [nganHangCauHoi, setNganHangCauHoi] = useState<CauHoi[]>(() => {
		const daLuu = localStorage.getItem('nganHangCauHoi');
		return daLuu
			? JSON.parse(daLuu)
			: [{ id: '1', maMon: 'INT1306', khoiKienThuc: 'Tổng quan', doKho: 'Dễ', noiDung: 'Giao thức HTTP là gì?' }];
	});

	const themCauHoi = (cauHoiMoi: CauHoi) => {
		const danhSachMoi = [...nganHangCauHoi, cauHoiMoi];
		setNganHangCauHoi(danhSachMoi);
		localStorage.setItem('nganHangCauHoi', JSON.stringify(danhSachMoi));
	};

	return { monHoc, khoiKienThuc, nganHangCauHoi, themCauHoi };
};
