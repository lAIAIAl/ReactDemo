import {
    AppstoreOutlined,
    PieChartOutlined,
    MailOutlined,
  } from '@ant-design/icons';
const menuList = [
    {
        key:'/admin/home',
        icon:<PieChartOutlined />,
        path:'/admin/home',
        name:'首页',
        title:'首页',
        disabled:true
    },
    {
        key:'/admin/manage',
        icon:<PieChartOutlined />,
        name:'商品',
        children:[
            {
                key:'/admin/manage/product',
                icon:<PieChartOutlined />,
                path:'/admin/product',
                name:'商品管理',
                title:'商品管理'
            },
            {
                key:'/admin/manage/category',
                icon:<PieChartOutlined />,
                path:'/admin/category',
                name:'分类管理',
                title:'分类管理'
            },
        ],
        title:'商品'
    },
    {
        key:'/admin/charts',
        icon:<PieChartOutlined />,
        name:'图表',
        title:'图表',
        children:[
            {
                disabled:true,
                key:'/admin/charts/line',
                icon:<PieChartOutlined />,
                path:'/admin/charts/line',
                name:'线性图',
                title:'线性图'
            },
            {
                disabled:true,
                key:'/admin/charts/bar',
                icon:<MailOutlined />,
                path:'/admin/charts/bar',
                name:'柱状图',
                title:'柱状图'
            },
            {
                disabled:true,
                key:'/admin/charts/pie',
                icon:<MailOutlined />,
                path:'/admin/charts/pie',
                name:'饼图',
                title:'饼图'
            },
        ]
    },
    {
        key:'/admin/user',
        icon:<AppstoreOutlined />,
        path:'/admin/user',
        name:'用户管理',
        title:'用户管理'
    },
    {
        key:'/admin/role',
        icon:<AppstoreOutlined />,
        path:'/admin/role',
        name:'角色管理',
        title:'角色管理'
    },

]

export default menuList;