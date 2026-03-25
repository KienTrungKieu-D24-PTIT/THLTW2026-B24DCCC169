import { useState } from 'react';

export default () => {
	const [vanBang, setVanBang] = useState<any[]>([]);

	const themVanBang = (val: any) => setVanBang([...vanBang, { ...val, id: Date.now().toString() }]);
	const suaVanBang = (val: any) => setVanBang(vanBang.map((v) => (v.id === val.id ? val : v)));
	const xoaVanBang = (id: string) => setVanBang(vanBang.filter((v) => v.id !== id));

	return { vanBang, themVanBang, suaVanBang, xoaVanBang };
};
