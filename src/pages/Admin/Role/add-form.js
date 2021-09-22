import React, {Component} from 'react'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
添加分类的form组件
 */
class AddForm extends Component {

  constructor(props){
      super(props)
      this.ref = React.createRef()
      this.aform = React.createRef()
  }
  getValue=()=>{
      return this.ref.current.props.value
  }
  reset=()=>{
    this.aform.current.resetFields()
  }
  state = {
    value:''
  }
  render() {
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form ref={this.aform}>
        <Item label='角色名称' {...formItemLayout}
            name='roleName'
            initialValue=''
            rules={[
                {required: true, message: '角色名称必须输入'}
              ]}
        >
            <Input placeholder='请输入角色名称' ref={this.ref}  />
        </Item>
      </Form>
    )
  }
}

export default AddForm