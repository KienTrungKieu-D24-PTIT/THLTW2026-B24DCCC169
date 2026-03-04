import { useState } from 'react';

export interface BaiHoc {
	id: string;
	tenMon: string;
	ngayHoc: string;
	thoiLuong: number;
	noiDung: string;
	ghiChu: string;
}

export default () => {
	const [lichSuHocTap, setLichSuHocTap] = useState<BaiHoc[]>(() => {
		const daLuu = localStorage.getItem('quanLyHocTap');
		return daLuu ? JSON.parse(daLuu).tienDoHocTap : [];
	});

	const luuVaoLocalStorage = (danhSachMoi: BaiHoc[]) => {
		setLichSuHocTap(danhSachMoi);
		localStorage.setItem('quanLyHocTap', JSON.stringify({ tienDoHocTap: danhSachMoi }));
	};

	return {
		lichSuHocTap,
		luuVaoLocalStorage,
		danhMucMonHoc: ['Toán', 'Văn', 'Anh', 'Khoa học', 'Công nghệ'],
	};
};
