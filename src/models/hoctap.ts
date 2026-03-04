import { useState } from 'react';

export default () => {
  const [danhMucMonHoc] = useState<string[]>(['Toán', 'Văn', 'Anh', 'Khoa học', 'Công nghệ']);
  const [lichSuHocTap] = useState([]);

  return {
    danhMucMonHoc,
    lichSuHocTap,
  };
};
