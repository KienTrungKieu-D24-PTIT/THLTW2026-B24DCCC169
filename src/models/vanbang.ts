import { useState } from 'react';

export default () => {
	const [soVanBang, setSoVanBang] = useState<any[]>([
		{ id: 's1', nam: 2026, tenSo: 'Sổ gốc cấp bằng 2026', currentSoVaoSo: 0 },
	]);

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

	const [cauHinhTruong, setCauHinhTruong] = useState<any[]>([
		{ id: 'f1', tenTruong: 'Dân tộc', kieuDuLieu: 'String' },
		{ id: 'f2', tenTruong: 'Điểm trung bình', kieuDuLieu: 'Number' },
		{ id: 'f3', tenTruong: 'Ngày nhập học', kieuDuLieu: 'Date' },
	]);

	const [vanBang, setVanBang] = useState<any[]>([]);

	const themSoVanBang = (val: any) =>
		setSoVanBang([...soVanBang, { ...val, id: Date.now().toString(), currentSoVaoSo: 0 }]);
	const themQuyetDinh = (val: any) =>
		setQuyetDinh([...quyetDinh, { ...val, id: Date.now().toString(), luotTraCuu: 0 }]);
	const themCauHinh = (val: any) => setCauHinhTruong([...cauHinhTruong, { ...val, id: Date.now().toString() }]);

	const themVanBang = (val: any) => {
		const qd = quyetDinh.find((q) => q.soQD === val.soQD);
		if (!qd) return false;

		const soIndex = soVanBang.findIndex((s) => s.nam === qd.namSo);
		if (soIndex === -1) return false;

		const newSo = [...soVanBang];
		newSo[soIndex].currentSoVaoSo += 1;
		setSoVanBang(newSo);

		setVanBang([...vanBang, { ...val, soVaoSo: newSo[soIndex].currentSoVaoSo, id: Date.now().toString() }]);
		return true;
	};

	const tangLuotTraCuu = (soQD: string) => {
		setQuyetDinh(quyetDinh.map((qd) => (qd.soQD === soQD ? { ...qd, luotTraCuu: qd.luotTraCuu + 1 } : qd)));
	};

	return {
		soVanBang,
		themSoVanBang,
		quyetDinh,
		themQuyetDinh,
		cauHinhTruong,
		themCauHinh,
		vanBang,
		themVanBang,
		tangLuotTraCuu,
	};
};
