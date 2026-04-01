import { useState } from 'react';

export default () => {
	const [clbs, setClbs] = useState<any[]>([
		{
			id: 'clb1',
			ten: 'CLB Lập trình PTIT',
			anh: '💻',
			ngayThanhLap: '2020-01-01',
			moTa: 'Nơi hội tụ code thủ',
			chuNhiem: 'Nguyễn Văn A',
			hoatDong: true,
		},
		{
			id: 'clb2',
			ten: 'CLB Âm nhạc',
			anh: '🎸',
			ngayThanhLap: '2021-05-15',
			moTa: 'Hát hay không bằng hay hát',
			chuNhiem: 'Trần Thị B',
			hoatDong: true,
		},
	]);

	const themCLB = (val: any) => setClbs([{ ...val, id: 'clb' + Date.now() }, ...clbs]);
	const suaCLB = (val: any) => setClbs(clbs.map((c) => (c.id === val.id ? val : c)));
	const xoaCLB = (id: string) => setClbs(clbs.filter((c) => c.id !== id));

	return { clbs, themCLB, suaCLB, xoaCLB };
};
