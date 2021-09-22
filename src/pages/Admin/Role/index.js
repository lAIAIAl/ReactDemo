import React, { Component } from 'react'
import {reqRoles,reqAddRole,reqUpdateRole} from '../../../api/index'
import {
    Card,Button,message,Table,Modal
} from 'antd'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../../utils/memoryUtils'
import storageUtils from '../../../utils/storageUtils'

export default class User extends Component {
    state = {
        roles: [], // 所有角色的列表
        role: {}, // 选中的role
        isShowAdd: false, // 是否显示添加界面
        isShowAuth: false, // 是否显示设置权限界面
        loading:false
    }
    constructor (props) {
        super(props)
        this.auth = React.createRef()
        this.add = React.createRef()
    }
    UNSAFE_componentWillMount () {
        this.initColumns()
    }
    componentDidMount () {
        this.getRoles()
    }

    initColumns = ()=>{
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },

            {
                title: '授权时间',
                dataIndex: 'auth_time'
            },
            {
                title: '授权人',
                dataIndex: 'author',
            }
        ]
    }
    getRoles = async () => {
        this.setState({loading:true})
        const result = await reqRoles()
        if (result.status===1) {
          const roles = result.data
          this.setState({
            roles,
            loading:false
          })
        }
    }
    onRow = (role) => {
      return {
        onClick: event => { // 点击行
          console.log('row onClick()', role)
          // alert('点击行')
          this.setState({
            role
          })
        },
      }
    }
    addRole = async()=>{
        // 进行表单验证, 只能通过了才向下处理
        const roleName = this.add.current.getValue()
        console.log(roleName)
        if(roleName){
            this.setState({
                isShowAdd: false
            })
            this.add.current.reset()
            const result = await reqAddRole(roleName)
            if (result.status===0) {
                message.success('添加角色成功')
                // this.getRoles()
                // 新产生的角色
                const role = result.info[0]
                // 更新roles状态: 基于原本状态数据更新
                this.setState(state => ({
                  roles: [...state.roles, role]
                }))
      
              } else {
                message.success(result.msg)
              }
        }
    }
    updateRole =async()=>{
           // 隐藏确认框
      this.setState({
        isShowAuth: false,
      })
  
      const role = this.state.role
      const auth_list = this.auth.current.getMenus()
      const auth = auth_list?auth_list.join(','):''
      const author = memoryUtils.user.username
      const author_id = memoryUtils.user.user_id
      role.auth = auth  
      role.author = author  
      role.author_id = author_id  
      // 请求更新
      const result = await reqUpdateRole(role)
      console.log(result)
      if (result.status===0) {
        if (role.id === memoryUtils.user.user_id) {
            memoryUtils.user = {}
            storageUtils.removeUser()
            message.success('设置当前用户角色权限成功')
            let that = this
            setTimeout(function(){
                that.props.history.replace('/login')
            },500)
        } 
        else{
            message.success('设置角色权限成功')
            this.getRoles()
        }
      }
    }
    render() {
        const {roles, role, isShowAdd, isShowAuth,loading} = this.state
        const length = roles.length
        const extra = 1
        const title = (<span>
            <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button> &nbsp;&nbsp;
            <Button type='primary' disabled={!role.id} onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
        </span>)
        return (
            <Card title={title} extra={extra}>
            <Table 
                rowKey='id'
                bordered
                dataSource={roles} 
                columns={this.columns} 
                loading={loading}
                pagination={{
                    defaultPageSize:5,
                    total:length,
                    showQuickJumper:true,
                    showTotal: ((total) => {
                        return `共 ${total} 条`;
                      }),
                }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: [role.id],
                    onSelect: (role) => { // 选择某个radio时回调
                      this.setState({
                        role
                      })
                    }
        
                }}
                onRow={this.onRow}
                
            />
            <Modal
                title="添加角色"
                visible={isShowAdd}
                onOk={this.addRole}
                onCancel={() => {
                    this.setState({isShowAdd: false})
                    /* this.form.resetFields() */
                }}
            >
                <AddForm
                    ref={this.add}
                />
            </Modal>

            <Modal
                title="设置角色权限"
                visible={isShowAuth}
                onOk={this.updateRole}
                onCancel={() => {
                    this.setState({isShowAuth: false})
                }}
            >
                <AuthForm ref={this.auth} role={role}/>
            </Modal>
        </Card>
        )
    }
}
