import React, { useState } from 'react';
import { PageHeader , Input , Button, message } from 'antd'
const { TextArea } = Input;
import db from '../../firebase';

const CreateQuery = () => {

    const [ title , setTitle ] = useState('')
    const [ content , setContent ] = useState('')

    const onTitleChange = (event) => setTitle(event.target.value)
    const onContentChange = (event) => setContent(event.target.value)


    const onCreate = (event) => {
        let queryRef = db.collection('queries')
        let payload = {
            "title":title,
            "content":content
        }
        queryRef.add(payload)
            .then(function(doc) {
                message.success("Query Added")
                setTitle('')
                setContent('')
            })
            .catch(function(error) {
                message.error("Error:"+error+"  Try again later")
            })
    }
    return (
        <div className="create_query_container" style={{padding:'30px',paddingBottom:'50px', border:'ridge', borderRadius:20}}>
            <div className="page_header_container">
                <PageHeader
                    className="site-page-header-1"
                    title="Create Query"
                    style={{border: '1px solid rgb(235, 237, 240)'}}
                />
            </div>
            <div className="query_inputs_container">
                <div className="query_input_container" style={{margin:'30px'}}>
                    <div className="query_input_title">
                        <h2>Query Title</h2>
                    </div>
                    <div className="query_input">
                        <Input placeholder="Query Title" value={title} onChange={onTitleChange}/>
                    </div>
                </div>
                <div className="query_input_container"  style={{margin:'30px'}}>
                    <div className="query_input_title">
                        <h2>Query Content</h2>
                    </div>
                    <div className="query_input">
                        <TextArea rows ={8} placeholder="Query Content" value={content} onChange={onContentChange}  />
                    </div>
                        <Button type="primary" size="large" style={{float:'right',marginTop:'20px'}} onClick={onCreate}>Create Query</Button>
                </div>
                    
           </div>

        </div>
    )
}

export default CreateQuery ;