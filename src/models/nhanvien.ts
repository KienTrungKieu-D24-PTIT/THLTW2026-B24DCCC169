import { useState } from 'react';

export default () => {
	const [nhanVien, setNhanVien] = useState([
		{ id: 'nv1', ten: 'Nam', gioiHanKhach: 10, lichLam: '9h-17h Thứ 2-6' },
		{ id: 'nv2', ten: 'Hương', gioiHanKhach: 5, lichLam: '13h-21h Cuối tuần' },
	]);

	const themNhanVien = (nvMoi: any) => {
		setNhanVien([...nhanVien, { ...nvMoi, id: 'nv' + Date.now() }]);
	};

	const suaNhanVien = (nvSua: any) => {
		setNhanVien(nhanVien.map((nv) => (nv.id === nvSua.id ? nvSua : nv)));
	};

	const xoaNhanVien = (id: string) => {
		setNhanVien(nhanVien.filter((nv) => nv.id !== id));
	};

	return { nhanVien, themNhanVien, suaNhanVien, xoaNhanVien };
};
