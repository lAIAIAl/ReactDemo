import React, {Component} from 'react'
import {
  Card,
  List,
} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import LinkButton from '../../../../components/link-button'

import './product.less'

import defaultUrl from '../../../../utils/current';

const Item = List.Item
/* 
    product详情子路由组件
*/
export default class ProductDetails extends Component {
    state = {
        categoryName1:'',
        categoryName2:''
    }
    componentDidMount(){
        const {category} = this.props.location.state.product
        this.setState({
            categoryName1:category.split('->')[0],
            categoryName2:category.split('->')[1]
        })
    }
    
    render() {
        let {name, description, price,imgs,details} = this.props.location.state.product
        const {categoryName1, categoryName2} = this.state
        imgs = imgs===''?[]:imgs.split(',')
        const title = (
            <span>
              <LinkButton>
                <ArrowLeftOutlined
                  style={{marginRight: 10, fontSize: 20}}
                  onClick={() => this.props.history.goBack()}
                />
              </LinkButton>
      
              <span>商品详情</span>
            </span>
          )
        return (
          <Card title={title} className='product-detail'>
            <List>
              <Item>
                <span className="left">商品名称:</span>
                <span>{name}</span>
              </Item>
              <Item>
                <span className="left">商品描述:</span>
                <span>{description}</span>
              </Item>
              <Item>
                <span className="left">商品价格:</span>
                <span>{price}元</span>
              </Item>
              <Item>
                <span className="left">所属分类:</span>
                <span>{categoryName1} {categoryName2 ? ' --> '+categoryName2 : ''}</span>
              </Item>
              <Item>
                <span className="left">商品图片:</span>
                <span>
                  {
                    imgs.map(img => (
                      <img
                        key={img}
                        src={defaultUrl+'/image/'+img}
                        className="product-img"
                        alt="img"
                      />
                    ))
                  }
                </span>
              </Item>
              <Item>
                <span className="left">商品详情:</span>
                {/* 
                  dangerouslySetInnerHTML 
                 */}
                <span dangerouslySetInnerHTML={{__html: details}}>
                </span>
              </Item>
      
            </List>
          </Card>
        )
    }
}
