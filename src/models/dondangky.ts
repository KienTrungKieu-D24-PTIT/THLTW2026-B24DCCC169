import { useState } from 'react';
import moment from 'moment';

export default () => {
	const [dons, setDons] = useState<any[]>([
		{
			id: 'd1',
			hoTen: 'Lê Văn C',
			email: 'c@gmail.com',
			sdt: '0123',
			gioiTinh: 'Nam',
			diaChi: 'Hà Nội',
			soTruong: 'Code',
			clbId: 'clb1',
			lyDo: 'Thích học hỏi',
			trangThai: 'Pending',
			ghiChu: '',
		},
		{
			id: 'd2',
			hoTen: 'Phạm Thị D',
			email: 'd@gmail.com',
			sdt: '0456',
			gioiTinh: 'Nữ',
			diaChi: 'Hà Nội',
			soTruong: 'Hát',
			clbId: 'clb2',
			lyDo: 'Đam mê',
			trangThai: 'Approved',
			ghiChu: '',
		},
	]);
	const [lichSu, setLichSu] = useState<any[]>([]);

	const themDon = (val: any) => setDons([{ ...val, id: 'd' + Date.now(), trangThai: 'Pending' }, ...dons]);
	const suaDon = (val: any) => setDons(dons.map((d) => (d.id === val.id ? val : d)));
	const xoaDon = (id: string) => setDons(dons.filter((d) => d.id !== id));

	const xuLyDon = (ids: string[], trangThai: string, ghiChu: string = '') => {
		setDons((prev) => prev.map((d) => (ids.includes(d.id) ? { ...d, trangThai, ghiChu } : d)));
		const historyEntry = {
			id: Date.now().toString(),
			thoiGian: moment().format('HH:mm DD/MM/YYYY'),
			hanhDong: trangThai === 'Approved' ? 'Duyệt đơn' : 'Từ chối đơn',
			chiTiet: `Admin đã ${trangThai} ${ids.length} đơn. Lý do/Ghi chú: ${ghiChu || 'Không có'}`,
		};
		setLichSu((prev) => [historyEntry, ...prev]);
	};

	const chuyenCLB = (ids: string[], newClbId: string) => {
		setDons((prev) => prev.map((d) => (ids.includes(d.id) ? { ...d, clbId: newClbId } : d)));
		const historyEntry = {
			id: Date.now().toString(),
			thoiGian: moment().format('HH:mm DD/MM/YYYY'),
			hanhDong: 'Chuyển CLB',
			chiTiet: `Đã chuyển ${ids.length} thành viên sang CLB mới.`,
		};
		setLichSu((prev) => [historyEntry, ...prev]);
	};

	return { dons, lichSu, themDon, suaDon, xoaDon, xuLyDon, chuyenCLB };
};
