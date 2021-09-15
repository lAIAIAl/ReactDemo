import React, { Component } from 'react'

import {
  Card,
  Form,
  Input,
  Cascader,
  Upload,
  Button,
  message
}
from 'antd'

import categoryOptions from '../../../../utils/categoryList'

import {ArrowLeftOutlined} from '@ant-design/icons'

import LinkButton from '../../../../components/link-button'

import PicturesWall from './pictures-wall'

const {Item} = Form
const {TextArea} = Input

export default class AddProduct extends Component {
  constructor (props) {
    super(props)
    // 创建用来保存ref标识的标签对象的容器
    this.pw = React.createRef()
    this.editor = React.createRef()
  }
  submit = async()=>{
    try {
	    const values = await this.formRef.current.validateFields();
      const imgs = this.pw.current.getImgs()
	    console.log('Success:', values,imgs);
	    message.success('提交校验成功')
	  } catch (errorInfo) {
	    console.log('Failed:', errorInfo);
	    message.warn('提交校验失败')
	  }
  }
  formRef = React.createRef()
  validatePrice = (rule, value, callback) => {
    console.log(value, typeof value)
    if (value*1 > 0) {
      callback() // 验证通过
    } else {
      callback('价格必须大于0') // 验证没通过
    }
  }
  UNSAFE_componentWillMount(){
    const product =  this.props.location.state
    this.isUpdate = !!product
    this.product = product || {}
    console.log(product)
  }
  render() {
    const {isUpdate,product} = this
    const { imgs, details} = product

    const title = (
      <span>
        <LinkButton>  
          <ArrowLeftOutlined        
            style={{marginRight: 10, fontSize: 20}}
            onClick={() => this.props.history.goBack()}/>
            <span>{isUpdate?'修改商品':'添加商品'}</span>
        </LinkButton>
      </span>
    )
    const formItemLayout = {
      labelCol:{span:2},
      wrapperCol:{span:8},
    }
    return (
      <Card title={title}>
        <Form {...formItemLayout} ref={this.formRef}>
          <Item
            label="商品名称"
            name="name"
            initialValue={product.name}
            rules={[{ required: true, message: '请输入商品名称!' }]}
          >
            <Input placeholder='请输入商品名称' />
          </Item>
          <Item label='商品描述'
            initialValue={product.description}
            name="description"
            rules={[{ required: true, message: '请输入商品描述!' }]}
          >
            <TextArea placeholder='请输入商品描述' autoSize={{maxRows:6,minRows:2}}>
            </TextArea>
          </Item>
          <Item
            label="商品价格"
            name="price"
            initialValue={product.price}
            rules={[{ required: true, message: '请输入商品价格!' },{validator: this.validatePrice}]}
          >
            <Input placeholder='请输入商品价格' 
              type='number' addonAfter='元' />
          </Item>
          <Item label='商品分类'
            name="category"
            rules={[{ required: true, message: '请选择商品分类!' }]}
            initialValue={product.category_ids?product.category_ids.split(','):[]}
            >
            <Cascader 
              options={categoryOptions}
              expandTrigger="hover"
              changeOnSelect 
            />
          </Item>
          <Item label='商品图片'>
            <PicturesWall ref={this.pw} imgs={imgs.split(',')} />
          </Item>
          <Item label='商品详情'>
            商品详情
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
