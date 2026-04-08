import { useState } from 'react';

export default () => {
	const [diemDens, setDiemDens] = useState<any[]>([
		{
			id: 'd1',
			ten: 'Vịnh Hạ Long',
			loaiHinh: 'Biển',
			danhGia: 4.8,
			hinhAnh: '',
			thoiGianThamQuan: 4,
			chiPhi: { anUong: 500000, diChuyen: 200000, luuTru: 800000 },
		},
		{
			id: 'd2',
			ten: 'Fansipan Sapa',
			loaiHinh: 'Núi',
			danhGia: 4.9,
			hinhAnh: '',
			thoiGianThamQuan: 6,
			chiPhi: { anUong: 400000, diChuyen: 300000, luuTru: 600000 },
		},
		{
			id: 'd3',
			ten: 'Phố cổ Hội An',
			loaiHinh: 'Thành phố',
			danhGia: 4.7,
			hinhAnh: '',
			thoiGianThamQuan: 3,
			chiPhi: { anUong: 300000, diChuyen: 100000, luuTru: 500000 },
		},
	]);

	const themDiemDen = (val: any) => setDiemDens([{ ...val, id: 'd' + Date.now() }, ...diemDens]);
	const suaDiemDen = (val: any) => setDiemDens(diemDens.map((d) => (d.id === val.id ? val : d)));
	const xoaDiemDen = (id: string) => setDiemDens(diemDens.filter((d) => d.id !== id));

	return { diemDens, themDiemDen, suaDiemDen, xoaDiemDen };
};
