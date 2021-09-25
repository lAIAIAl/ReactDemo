import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import formateDate from '../../../utils/dateUtils'
import LinkButton from '../../../components/link-button'
import {reqDeleteUser, reqUsers, reqAddOrUpdateUser} from '../../../api'
import UserForm from './user-form'

/*
用户路由
 */
export default class User extends Component {

  constructor(props){
    super(props)
    this.user_form = React.createRef()
  }

  state = {
    users: [], // 所有用户列表
    roles: [], // 所有角色列表
    isShow: false, // 是否显示确认框
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  /*
  根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
   */
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role.id] = role.name
      return pre
    }, {})
    // 保存
    this.roleNames = roleNames
  }

  /*
  显示添加界面
   */
  showAdd = () => {
    // 去除前面保存的user
    //this.setState({user:null})
    this.user = {username:'',password:'',phone:'',email:'',role:''}
    this.setState({isShow: true})
  }

  /*
  显示修改界面
   */
  showUpdate = (user) => {
    // 保存user
    //this.setState({user:user})
    this.user = user
    console.log(this.user)
    if(this.user_form.current)
      this.user_form.current.reset(user)
    this.setState({
      isShow: true
    })
  }

  /*
  删除指定用户
   */
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user.user_id)
        if(result.status===0) {
          message.success('删除用户成功!')
          this.getUsers()
        }
      }
    })
  }

  /*
  添加/更新用户
   */
  addOrUpdateUser = async () => {


    // 1. 收集输入数据
    
    const user = this.user_form.current.getValues()
    if(!user.username||!user.password ){
      message.error(`${user.username?'密码':'用户名'}未输入`);  
      return ; 
    }
    if(!(/^1[3456789]\d{9}$/.test(user.phone))){ 
      message.error("手机号码不合法，请重新输入");  
      return ; 
    } 
    if(!(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/.test(user.email))){ 
      message.error("邮箱不合法，请重新输入");  
      return ; 
    }

    this.setState({isShow: false})

    //this.user_form.current.reset()
    // 如果是更新, 需要给user指定id属性
    if (this.user.user_id) {
      user.user_id = this.user.user_id
    }
    user.role = this.roleNames[user.role_id]
    this.user_form.current.empty()
    // 2. 提交添加的请求
    const result = await reqAddOrUpdateUser(user)
    // 3. 更新列表显示
    if(result.status===0) {
      message.success(`${this.user.user_id ? '修改' : '添加'}用户成功`)
      this.getUsers()
    }
    else{
      message.error(`${this.user.user_id ? '修改' : '添加'}用户失败`)
    }
  }

  getUsers = async () => {
    const result = await reqUsers()
    if (result.status===1) {
      const {users, roles} = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  UNSAFE_componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getUsers()
  }


  render() {

    const {users, roles, isShow} = this.state
    const user = this.user||{}
    const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='user_id'
          dataSource={users}
          columns={this.columns}
          pagination={{     
            defaultPageSize:5,
            total:users.length,
            showQuickJumper:true,
            showTotal: ((total) => {
                return `共 ${total} 条`;
              })
            }}
        />

        <Modal
          title={user.user_id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.user_form.current.empty()
            this.setState({isShow: false})
          }}
        >
          <UserForm
            ref= {this.user_form}
            roles={roles}
            user={user}
          />
        </Modal>

      </Card>
    )
  }
}