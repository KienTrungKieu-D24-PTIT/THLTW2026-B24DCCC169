import { useState } from 'react';

export default () => {
	const [nganSachTong, setNganSachTong] = useState<number>(5000000); // Mặc định 5 triệu
	const [lichTrinh, setLichTrinh] = useState<any[]>([]); // Lưu danh sách các điểm đã chọn vào lịch

	// Hàm thêm điểm đến vào ngày cụ thể
	const themVaoLichTrinh = (diemDen: any, ngay: number) => {
		setLichTrinh([...lichTrinh, { ...diemDen, idLich: Date.now().toString(), ngay }]);
	};

	const xoaKhoiLichTrinh = (idLich: string) => {
		setLichTrinh(lichTrinh.filter((l) => l.idLich !== idLich));
	};

	// Tính toán ngân sách hiện tại
	const tinhTongChiPhi = () => {
		return lichTrinh.reduce((tong, item) => {
			return tong + item.chiPhi.anUong + item.chiPhi.diChuyen + item.chiPhi.luuTru;
		}, 0);
	};

	const thongKeChiPhiTheoHangMuc = () => {
		return lichTrinh.reduce(
			(acc, item) => {
				acc.anUong += item.chiPhi.anUong;
				acc.diChuyen += item.chiPhi.diChuyen;
				acc.luuTru += item.chiPhi.luuTru;
				return acc;
			},
			{ anUong: 0, diChuyen: 0, luuTru: 0 },
		);
	};

	return {
		nganSachTong,
		setNganSachTong,
		lichTrinh,
		themVaoLichTrinh,
		xoaKhoiLichTrinh,
		tinhTongChiPhi,
		thongKeChiPhiTheoHangMuc,
	};
};
