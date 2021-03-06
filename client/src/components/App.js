import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import StreamCreate from './streams/StreamCreate'
// import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamShow from './streams/StreamShow'
import StreamList from './streams/StreamList'
import ShowBasket from './streams/ShowBasket'
import Checkout from './streams/Checkout'
import UserCenter from './streams/UserCenter'
import Header from './Header'
import history from '../history'
const App = () => {
    return (
        <div className="ui container" >
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <Route path="/streams/new" exact component={StreamCreate} />
                        <Route path="/streams/edit/:id" exact component={StreamEdit} />
                        <Route path="/streams/:id" exact component={StreamShow} />
                        <Route path="/basket" exact component={ShowBasket} />
                        <Route path="/checkout" exact component={Checkout} />
                        <Route path="/user_center" exact component={UserCenter} />
                    </Switch>
                </div>
            </Router>
        </div >
    )
}

export default App