import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
更新分类的form组件
 */
class UpdateForm extends Component {
  formRef = React.createRef()


  getValues=()=>{
    return this.formRef.current.getFieldsValue()
  }
  render() {

    //const {categoryName} = this.props

    return (
      <Form ref={this.formRef}>
        <Item name='name' rules={[
            {required: true, message: '分类名称必须输入'}]}>
              <Input placeholder='请输入分类名称'/>
        </Item>
      </Form>
    )
  }
}

export default UpdateForm