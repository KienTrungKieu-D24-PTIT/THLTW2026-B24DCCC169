import { useState } from 'react';

export default () => {
	const [dichVu, setDichVu] = useState([
		{ id: 'dv1', ten: 'Tư vấn chăm sóc sen đá', gia: 150000, thoiGian: 30 },
		{ id: 'dv2', ten: 'Setup tiểu cảnh Terrarium', gia: 450000, thoiGian: 60 },
		{ id: 'dv3', ten: 'Thay đất & Cắt tỉa cây', gia: 50000, thoiGian: 15 },
	]);

	const themDichVu = (dvMoi: any) => {
		setDichVu([...dichVu, { ...dvMoi, id: 'dv' + Date.now() }]);
	};

	const suaDichVu = (dvSua: any) => {
		setDichVu(dichVu.map((dv) => (dv.id === dvSua.id ? dvSua : dv)));
	};

	const xoaDichVu = (id: string) => {
		setDichVu(dichVu.filter((dv) => dv.id !== id));
	};

	return { dichVu, themDichVu, suaDichVu, xoaDichVu };
};
