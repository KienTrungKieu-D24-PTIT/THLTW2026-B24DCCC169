import { useState } from 'react';

export default () => {
	const [lichHen, setLichHen] = useState<any[]>([
		{
			id: 'lh1',
			khachHang: 'Chị Mai',
			idNhanVien: 'nv1',
			idDichVu: 'dv1',
			ngay: '2026-03-18',
			gio: '10:00',
			trangThai: 'Hoàn thành',
			danhGia: 5,
			phanHoi: '',
		},
		{
			id: 'lh2',
			khachHang: 'Chị Hoa',
			idNhanVien: 'nv2',
			idDichVu: 'dv1',
			ngay: '2026-03-18',
			gio: '22:00',
			trangThai: 'Hoàn thành',
			danhGia: 1,
			phanHoi: '',
		},
		{
			id: 'lh3',
			khachHang: 'Chị Hanh',
			idNhanVien: 'nv2',
			idDichVu: 'dv3',
			ngay: '2026-04-18',
			gio: '22:00',
			trangThai: 'Hoàn thành',
			danhGia: 3,
			phanHoi: '',
		},
	]);

	const datLichMoi = (thongTin: any) => {
		const biTrung = lichHen.find(
			(lh) =>
				lh.idNhanVien === thongTin.idNhanVien &&
				lh.ngay === thongTin.ngay &&
				lh.gio === thongTin.gio &&
				lh.trangThai !== 'Hủy',
		);
		if (biTrung) return false;
		setLichHen([
			{ ...thongTin, id: Date.now().toString(), trangThai: 'Chờ duyệt', danhGia: 0, phanHoi: '' },
			...lichHen,
		]);
		return true;
	};

	const capNhatTrangThai = (id: string, trangThaiMoi: string) => {
		setLichHen(lichHen.map((lh) => (lh.id === id ? { ...lh, trangThai: trangThaiMoi } : lh)));
	};

	return { lichHen, datLichMoi, capNhatTrangThai };
};
