import React, { useState } from 'react';
import { Card , Avatar , PageHeader , List , Collapse, Input, Button, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { navigate } from '@reach/router';
import './Query.css'
import db from  '../../firebase'

const { Meta } = Card;
const { Panel } = Collapse;
const { TextArea } = Input;
let temp =""

const AddReply = (props) => {

    const [ reply , SetReply ] = useState('')

    const setreply = (event) => {
        SetReply(event.target.value)
    }
    const sendReply = () => {
        let replyRef = db.collection(`queries/${temp.id}/replies`)
        let payload = {
            "name":temp.username,
            "content":reply
        }
        replyRef.add(payload)
            .then(function(doc){
                SetReply('');
            })
            .catch(function(error) {
                message.error("Error: "+error)
            })
        
    }

    return(
        <Collapse 
            bordered={false}>
            <Panel 
                header={[<h3 key="2" style={{textAlign:'center'}}><EditOutlined key="edit" />{" Add Reply "}</h3>]} 
                key="1"
                showArrow={false}
                
                style={{borderBottomLeftRadius:25 , borderBottomRightRadius:25 , backgroundColor:'gray'}}>
                    <Card
                        style={{ width: '100%' , borderRadius:25}}
                    >
                        <Meta
                        avatar={<Avatar src="https://pluspng.com/img-png/spiderman-logo-png-pin-spider-man-clipart-spiderman-logo-4-300.png" />}
                        title={temp.username}
                        />
                        <TextArea rows={4} style={{marginLeft:40 , width:'95%'}} onChange={value => setreply(value)} value={reply}/>
                        <Button style={{float:'right', marginTop:20}} type="primary" onClick={sendReply}>Reply</Button>
                    </Card>
                </Panel>
        </Collapse>
    )
}

class Query extends React.Component{

    state = {
        initLoading: true,
        data: [],
        list: [],
      };
    
      componentDidMount() {
        this.getData(res => {
          this.setState({
            initLoading: false,
            list: res,
          });
        });
        this.getQuery(res => {
            // console.log(res)
            this.setState({
                data:res,
            });
        });
      } 
   
      
    getQuery = callback => {
    let queryRef = db.collection('queries').doc(this.props.id) 

    queryRef
        .get()
        .then(doc =>{
            callback(doc.data())
        })
      }
    
      getData = callback => {
        db.collection(`queries/${this.props.id}/replies`)
            .onSnapshot(queries => {
                let queryData = queries.docs.map(query => {
                    let data = query.data()
                    let { id } = query
                    let payload ={
                        id,
                        ...data
                    }
                    return payload
                });
                callback(queryData)
            })
      };
    
    
    render(){
        temp = this.props
        const { initLoading,  list , data  } = this.state;
        
    
        return (
            <div className="query_container">
                <div className="page_header_container">
                    <PageHeader
                        style={{ borderTopLeftRadius:25 , borderTopRightRadius:25}}
                        onBack={() => navigate('/dashboard')}
                        title="Query"
                        subTitle=""
                    />
                </div>
                <div className="query_content_container">
                     <Card
                        style={{ width: '100%' }}
                        // actions={[
                        // <SettingOutlined key="setting" />,
                        // <EditOutlined key="edit" />,
                        // <EllipsisOutlined key="ellipsis" />,
                        // ]}
                    >
                        <Meta
                        avatar={<Avatar src="https://pluspng.com/img-png/spiderman-logo-png-pin-spider-man-clipart-spiderman-logo-4-300.png" />}
                        title={`Query :${data.title}`}
                        description={data.content}
                        />
                    </Card>
                </div>
                <div className="add_reply_container">
                        <AddReply />
                </div>
                <div className="reply_container">
                    <List
                        className="demo-loadmore-list"
                        loading={initLoading}
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={item => (
                        <List.Item className="list_item_container">
                            <List.Item.Meta
                                avatar={<Avatar src="https://pluspng.com/img-png/spiderman-logo-png-pin-spider-man-clipart-spiderman-logo-4-300.png" />}
                                title={<a>{item.name}</a>}
                                description={item.content}
                            />
                        </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}
export default Query;