import { useState } from 'react';

export default () => {
	const [soVanBang, setSoVanBang] = useState<any[]>([
		{ id: 's1', nam: 2026, tenSo: 'Sổ gốc cấp bằng 2026', currentSoVaoSo: 0 },
	]);

	const themSo = (val: any) => setSoVanBang([...soVanBang, { ...val, id: Date.now().toString(), currentSoVaoSo: 0 }]);
	const suaSo = (val: any) => setSoVanBang(soVanBang.map((s) => (s.id === val.id ? val : s)));
	const xoaSo = (id: string) => setSoVanBang(soVanBang.filter((s) => s.id !== id));
	const tangSoVaoSo = (nam: number) => {
		let nextSo = -1;
		const newData = soVanBang.map((s) => {
			if (s.nam === nam) {
				nextSo = s.currentSoVaoSo + 1;
				return { ...s, currentSoVaoSo: nextSo };
			}
			return s;
		});
		setSoVanBang(newData);
		return nextSo;
	};

	return { soVanBang, themSo, suaSo, xoaSo, tangSoVaoSo };
};
