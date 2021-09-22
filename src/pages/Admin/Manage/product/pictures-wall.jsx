import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../../../api/index';
import defaultUrl from '../../../../utils/current';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends Component {
  static propTypes = {
    imgs: PropTypes.array
  }
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
         /*{
        uid: '-1', // 每个file都有自己唯一的id
        name: 'xxx.png', // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片地址
      },*/
    ],
  }
  constructor (props) {
    super(props)

    let fileList = []

    // 如果传入了imgs属性
    const {imgs} = this.props
    if (imgs && imgs.length>0) {
      fileList = imgs.map((img, index) => ({
        uid: -index, // 每个file都有自己唯一的id
        name: img, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: defaultUrl+'/image/'+img
      }))
    }

    // 初始化状态
    this.state = {
      previewVisible: false, // 标识是否显示大图预览Modal
      previewImage: '', // 大图的url
      fileList // 所有已上传图片的数组
    }
  }
  getImgs  = () => {
    return this.state.fileList.map(file => file.name)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

    /*
  file: 当前操作的图片文件(上传/删除)
  fileList: 所有已上传图片文件对象的数组
   */
  handleChange = async ({ file, fileList }) => {
    let flag = 0
    const that = this
    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    if(file.status==='done') {
      const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
      console.log(result)
      if(result.status===0) {
        message.success('上传图片成功!')
        const {name, url} = result
        file = fileList[fileList.length-1]
        file.name = name
        file.url = url
      } else {
        message.error('上传图片失败')
      }
    } else if (file.status==='removed') { // 删除图片
      flag = 1
      Modal.confirm({
        /* title:'c', */
        content: '是否同时删除远程图片？',
        onOk:async()=>{
          const result = await reqDeleteImg(file.name)
          console.log(result)
          if (result===0) {
            message.success('删除图片成功!')
          } else {
            message.error('删除图片失败!')
          }
          that.setState({ fileList })
        },
        onCancel(){
          that.setState({ fileList })
        }
      })

    }

    // 在操作(上传/删除)过程中更新fileList状态
    if(flag===0)
      this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action= {defaultUrl+"/request/add-picture"}
          listType="picture-card"
          accept='image/*'  /*只接受图片格式*/
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          name='image'
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PicturesWall