import React , { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router'
import Home from './Home';
import Dashboard from './Dashboard';
import db , { auth } from '../../firebase';
import Query from './Query';


function App() {
    const [ user , setUser ] = useState(false)
    const [ name , setName ] = useState('')
    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user){
                console.log("signed in:"+user.uid)
                setUser(user);
                let userRef = db.collection('users').doc(user.uid) 
    
                userRef
                    .get()
                    .then(doc =>{
                        setName(doc.data().name)
                    })
            }else{
                console.log("Not signed in")
            }
        })
    
        if (user==false){
            navigate('/');
        }else{
            navigate('/dashboard');
        }

    })
    
    return (
        <div className="app_container">
            <Router >
                <Home default path="/"/>
                <Dashboard path = "/dashboard" />
                <Query path="/query/:id" username={name} />
            </Router>
        </div>
    )
}
export default App;