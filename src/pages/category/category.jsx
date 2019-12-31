import React from 'react'
import {Card,Table,Button,Icon} from 'antd'
import LinkButton from '../../components/link-button'
export default class Category extends React.Component{
  render(){
    // 标题
    const title = '一级分类列表'
    const btn = (
      <Button type='primary'>
        <Icon type="plus" /> 添加
      </Button>
    )
    const dataSource = [
      { 
        _id:'1',
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        _id:'2',
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width:300,
        render:()=>(
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看分类</LinkButton>
          </span>
        )
      }
    ]
    
    return (
      <Card  title={title} extra={btn} >
        <Table dataSource={dataSource} columns={columns} bordered rowKey='_id' />;
      </Card>
    )
  }
}