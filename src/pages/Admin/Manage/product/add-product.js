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

import RichTextEditor from './rich-text-editor'

import { reqAddOrUpdateProduct } from '../../../../api'

const {Item} = Form
const {TextArea} = Input

export default class AddProduct extends Component {
  constructor (props) {
    super(props)
    // 创建用来保存ref标识的标签对象的容器
    this.pw = React.createRef()
    this.editor = React.createRef()
  }
  changeCagetory = (value, selectedOptions)=>{
    console.log(value,selectedOptions)
    this.category = selectedOptions[0].label
    this.category += selectedOptions[1]? '->'+selectedOptions[1].label:''
  }
  submit = async()=>{
    try {
	    const values = await this.formRef.current.validateFields();
      const imgs = this.pw.current.getImgs()
      const details = this.editor.current.getDetail()
	    console.log('Success:', values,imgs);
	    message.success('提交校验成功')
      values.imgs = imgs.join(',')
      values.details = details
      if(this.isUpdate) {
        values.id = this.product.id
      }
      values.category_ids = values.category.join(',')
      values.category = this.category
      // 2. 调用接口请求函数去添加/更新
      const result = await reqAddOrUpdateProduct(values)
      // 3. 根据结果提示
      if (result===0) {
        message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
        this.props.history.goBack()
      } else {
        message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
      }
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
    this.category = product?product.category:''
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
              onChange={this.changeCagetory}
            />
          </Item>
          <Item label='商品图片'>
            <PicturesWall ref={this.pw} imgs={!imgs?[]:imgs.split(',')} />
          </Item>
          <Item label='商品详情' labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <RichTextEditor ref={this.editor} detail={details}/>
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
