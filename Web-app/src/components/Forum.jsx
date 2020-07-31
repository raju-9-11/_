import React , { useEffect , useState } from 'react';
import { Link } from '@reach/router'
import { Card , Avatar } from 'antd';
import './Forum.css'
import _ from 'lodash';
import db from '../../firebase'; 

const { Meta } = Card;


const Forum = (props) => {
    let [ queries , setQuery ] = useState([]);
    useEffect( ()=>{
        db.collection('queries')
            .onSnapshot(async queries => {
                let queryData = await queries.docs.map(query => {
                    let data = query.data()
                    let { id } = query
                    let payload ={
                        id,
                        ...data
                    }
                    return payload
                });
                setQuery(queryData)
            })
        },[])



    return (
        <div className="forum_container">
            <div className="articles_container">
                {
                    _.map(queries, (query,idx) => {
                        return(
                             <div className="article_container" style={{marginTop:20}} key={idx} data={query}>
                                 <Link to ={`/query/${query.id}`} >
                                    <Card 
                                        className="query_snippet_container"
                                        title={_.upperCase(query.title)} 
                                        // extra={
                                        //     <div className="post_snippet_links">
                                        //         <Link to = {`/query/${query.id}`} >More</Link>
                                        //     </div>
                                        // }
                                        // actions={[
                                        //     <SettingOutlined key="setting" />,
                                        //     <EditOutlined key="edit" />,
                                        //     <EllipsisOutlined key="ellipsis" />,
                                        // ]}
                                        >
                                            <Meta
                                            avatar={<Avatar src="https://pluspng.com/img-png/spiderman-logo-png-pin-spider-man-clipart-spiderman-logo-4-300.png" />}
                                            />
                                            <br />
                                            <h3>{query.title}</h3>
                                    <p className="article_content">            
                                        {query.content.substring(0,1000)+' .....'}
                                    </p>
                                    </Card>
                                </Link>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default Forum;