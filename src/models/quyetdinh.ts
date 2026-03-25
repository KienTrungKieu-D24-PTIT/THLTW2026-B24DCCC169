import { useState } from 'react';

export default () => {
	const [quyetDinh, setQuyetDinh] = useState<any[]>([
		{
			id: 'qd1',
			soQD: '101/QĐ-PTIT',
			ngayBanHanh: '2026-03-25',
			trichYeu: 'Tốt nghiệp đợt 1',
			namSo: 2026,
			luotTraCuu: 0,
		},
	]);

	const themQD = (val: any) => setQuyetDinh([...quyetDinh, { ...val, id: Date.now().toString(), luotTraCuu: 0 }]);
	const suaQD = (val: any) => setQuyetDinh(quyetDinh.map((q) => (q.id === val.id ? val : q)));
	const xoaQD = (id: string) => setQuyetDinh(quyetDinh.filter((q) => q.id !== id));

	const tangLuotTraCuu = (soQD: string) => {
		setQuyetDinh(quyetDinh.map((qd) => (qd.soQD === soQD ? { ...qd, luotTraCuu: qd.luotTraCuu + 1 } : qd)));
	};

	return { quyetDinh, themQD, suaQD, xoaQD, tangLuotTraCuu };
};
