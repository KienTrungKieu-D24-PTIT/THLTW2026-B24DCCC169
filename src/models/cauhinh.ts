import { useState } from 'react';

export default () => {
	const [cauHinhTruong, setCauHinhTruong] = useState<any[]>([
		{ id: 'f1', tenTruong: 'Dân tộc', kieuDuLieu: 'String' },
		{ id: 'f2', tenTruong: 'Điểm trung bình', kieuDuLieu: 'Number' },
	]);

	const themCauHinh = (val: any) => setCauHinhTruong([...cauHinhTruong, { ...val, id: 'f' + Date.now().toString() }]);
	const suaCauHinh = (val: any) => setCauHinhTruong(cauHinhTruong.map((c) => (c.id === val.id ? val : c)));
	const xoaCauHinh = (id: string) => setCauHinhTruong(cauHinhTruong.filter((c) => c.id !== id));

	return { cauHinhTruong, themCauHinh, suaCauHinh, xoaCauHinh };
};
