export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'Sản Phẩm',
	// 	path: '/products',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './pages/products/index',
	// 		},
	// 	],
	// },
	{
    name: 'Quản lý sản phẩm', 
    path: '/products',        
    component: './products',  
    icon: 'table',            
  },
  // --- BÀI TẬP LỚN (BT01) ---
    // Gom vào một menu cha để dễ quản lý
    {
        name: 'Quản lý kho', // Tên menu cha
        path: '/products',
        icon: 'table',
        routes: [
            {
                name: 'Danh sách sản phẩm', // Tên menu con
                path: '/products',          // Đường dẫn trùng cha để mặc định vào đây
                component: './products',    // Trỏ tới folder src/pages/products
                exact: true,
            },
            // Sau này bạn có thể thêm các menu con khác vào đây (VD: Danh mục, Nhập kho...)
        ],
    },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],

		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
