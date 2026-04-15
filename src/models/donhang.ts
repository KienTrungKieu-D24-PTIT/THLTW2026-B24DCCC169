import { useState } from 'react';

export default () => {
	// Dữ liệu cứng (Danh mục)
	const dsKhachHang = [
		{ id: 'KH01', ten: 'Nguyễn Văn A' },
		{ id: 'KH02', ten: 'Trần Văn B' },
		{ id: 'KH03', ten: 'Lê Văn C' },
		{ id: 'KH04', ten: 'Lê Văn D' },
	];

	const dsSanPham = [
		{ id: 'SP1', ten: 'Bàn phím cơ China', gia: 1200000 },
		{ id: 'SP2', ten: 'Chuột không dây USA', gia: 450000 },
		{ id: 'SP3', ten: 'Màn hình 24 inch Indo', gia: 3500000 },
		{ id: 'SP4', ten: 'Loa JBL Go 4', gia: 20000000 },
		{ id: 'SP', ten: 'Loa JBL Go 3', gia: 10000000 },
	];

	const [donHangs, setDonHangs] = useState<any[]>([
		{
			maDon: 'DH001',
			khachHang: 'KH01',
			ngayDat: '2026-04-10',
			tongTien: 1650000,
			trangThai: 'Chờ xác nhận',
			sanPhams: ['SP1', 'SP2'],
		},
		{
			maDon: 'DH002',
			khachHang: 'KH02',
			ngayDat: '2026-04-12',
			tongTien: 3500000,
			trangThai: 'Đang giao',
			sanPhams: ['SP3'],
		},
		{
			maDon: 'DH003',
			khachHang: 'KH03',
			ngayDat: '2026-04-10',
			tongTien: 1650000,
			trangThai: 'Chờ xác nhận',
			sanPhams: ['SP1', 'SP2', 'SP3'],
		},
		{
			maDon: 'DH004',
			khachHang: 'KH03',
			ngayDat: '2026-04-10',
			tongTien: 2000000,
			trangThai: 'Hoàn thành',
			sanPhams: ['SP4', 'SP2'],
		},
		{
			maDon: 'DH006',
			khachHang: 'KH04',
			ngayDat: '2026-04-10',
			tongTien: 100050000,
			trangThai: 'Đang giao',
			sanPhams: ['SP1', 'SP2'],
		},
		{
			maDon: 'DH0010',
			khachHang: 'KH03',
			ngayDat: '2026-04-10',
			tongTien: 199990000,
			trangThai: 'Chờ xác nhận',
			sanPhams: ['SP1', 'SP2'],
		},
	]);

	const themDon = (val: any) => setDonHangs([val, ...donHangs]);

	const suaDon = (val: any) => setDonHangs(donHangs.map((d) => (d.maDon === val.maDon ? val : d)));

	const huyDon = (maDon: string) => {
		setDonHangs(donHangs.map((d) => (d.maDon === maDon ? { ...d, trangThai: 'Hủy' } : d)));
	};

	return { donHangs, dsKhachHang, dsSanPham, themDon, suaDon, huyDon };
};
