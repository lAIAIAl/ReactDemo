import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message,
    Modal
} from 'antd'

import {PlusOutlined} from '@ant-design/icons'
import {numFormate} from '../../../../utils/tools'
import LinkButton from '../../../../components/link-button'
import { reqProducts, reqUpdateStatus } from '../../../../api'
const Option = Select.Option

/* 
    product默认子路由组件
*/
export default class ProductHome extends Component {
    state = {
        products:[],
        columns:[],
        loading:false,
        searchName:'',
        searchType:'productName'
    }
    initColumns = ()=>{
        this.setState({columns:[{
            title: '商品名称',
            dataIndex: 'name',
          },
          {
            title: '商品描述',
            dataIndex: 'description',
          },
          {
            title: '价格',
            dataIndex: 'price',
            render:(item)=> '￥' + numFormate(item)
          },
          {
            width:100,
            title: '状态',
            dataIndex: 'status',
            render:(status,product)=> {
                let state = status == 0 ? '已下架':'在售'
                let action = status == 0 ? '上架':'下架'
                return (<span>
                    <Button type='primary' onClick={()=>this.changeState(product.id,status)}>{action}</Button>
                    <span>{state}</span>
                </span>)
            }
          },
          {
              title:'操作',
              render:(x,product)=> {
                  return (
                      <div>
                          <LinkButton onClick={() => this.props.history.push('/admin/manage/product/details', {product})}>详情</LinkButton>
                          <LinkButton onClick={() => this.props.history.push('/admin/manage/product/addUpdate', product)}>修改</LinkButton>
                      </div>
                  )
              }
          }
        ]})
    }
    changeState = (id,state) =>{
        Modal.confirm({
            /* title:'c', */
            content: '是否确定更新商品状态？',
            onOk:async()=>{
                const status = await reqUpdateStatus(id,state)
                if(status == 0){
                    message.success('更新商品成功')
                    this.searchProducts()
                }
                else 
                    message.warn('更新商品失败')
            },
            onCancel(){

            }
        })
    }
    initProducts = async ()=>{
        this.setState({loading:true})
        const result = await reqProducts({name:'',description:''})
        this.setState({loading:false})
        this.setState({products:result})
    }
    searchProducts = async()=>{
        this.setState({loading:true})
        let result
        if(this.state.searchType === 'productName')
            result = await reqProducts({name:this.state.searchName,description:''})
        else
            result = await reqProducts({name:'',description:this.state.searchName})
        this.setState({loading:false})
        this.setState({products:result})
    }
    UNSAFE_componentWillMount(){
        this.initColumns()
        this.initProducts()
    }
    render() {
        const {products,columns,loading,searchType} = this.state
        const length = products.length
        const title = (
            <span>
                <Select value={searchType} style={{width:'150px',marginRight:'15px'}} onChange={value => this.setState({searchType:value})}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='请输入关键字' style={{width:'150px',marginRight:'15px'}} onChange={event => this.setState({searchName:event.target.value})}/>
                <Button type='primary' onClick={this.searchProducts}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={()=>this.props.history.push('/admin/manage/product/addUpdate')}>
                <PlusOutlined />
                添加商品
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table 
                    rowKey='id'
                    bordered
                    dataSource={products} 
                    columns={columns} 
                    loading={loading}
                    pagination={{
                        defaultPageSize:5,
                        total:length,
                        showQuickJumper:true,
                        showTotal: ((total) => {
                            return `共 ${total} 条`;
                          }),
                    
                    }}
                    
                />
            </Card>
        )
    }
}
