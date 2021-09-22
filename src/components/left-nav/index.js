import React, { Component } from 'react'
import { Menu } from 'antd';
import './index.less'
import logo from '../../assets/logo2.jpg'
import { Link ,withRouter} from 'react-router-dom';
import menuList from '../../config/menuConfig';
const { SubMenu } = Menu;


class LeftNav extends Component {
    state = {
        collapsed: false,
      };
    
    toggleCollapsed = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
    getMenuNodes = (menuList)=>{
        return menuList.map(item=>{
            if(!item.children)
            /*name,key,icon,children*/
                return (<Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>{item.name}</Link>
                        </Menu.Item>)
            else{
                return (<SubMenu key={item.key} icon={item.icon} title={item.name}>
                            {this.getMenuNodes(item.children)}
                        </SubMenu>)
            }
        })
       
    }
    UNSAFE_componentWillMount() {
        this.menuNode = this.getMenuNodes(menuList)
    }
    render() {
        let path = this.props.location.pathname;
        const group = path.split('/')
        let selected = group.slice(0,3).join('/')
        path = path.indexOf('/product')===-1 ?path:group.slice(0,4).join('/')
        console.log(selected,path)

        return (
            <div className='left-nav'>
                <Link className='left-nav-header' to='/'>
                    <img src={logo} alt='logo' />
                    <h1>管理后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={[path]}
                    defaultOpenKeys={[selected]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    >
                 {/*   <Menu.Item key="1" icon={menuList[0].icon}>
                        <Link to='/admin/home'>
                            首页
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                        <Menu.Item key="2" icon={<MailOutlined />}><Link to='/admin/product'>商品管理</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/admin/category'>品类管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图表">
                        <Menu.Item key="4"><Link to='/admin/charts/line'>线性图</Link></Menu.Item>
                        <Menu.Item key="5"><Link to='/admin/charts/bar'>柱状图</Link></Menu.Item>
                        <Menu.Item key="6"><Link to='/admin/charts/pie'>饼图</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="7" icon={<PieChartOutlined />}>
                        <Link to='/admin/user'>用户管理</Link>
                    </Menu.Item>
                */}
                    {this.menuNode}
                </Menu>
            </div>
        )
    }
}


export default withRouter(LeftNav)