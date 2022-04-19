import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Navbar from './navbar/Navbar'
import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Dashboard from "../pages/Dashboard"
import UserDetail from "../pages/UserDetails/UserDetail"
import Service from '../pages/Services/Service'
import ServiceDetail from "../pages/Services/ServiceDetail"
import Category from "../pages/Services/Category"
import About from "../pages/About"
import NotFound from "./NotFound"
import Profile from "./profile/Profile"
import FavService from "../pages/favServices/FavService"
import BookingRequest from "../pages/bookingRequest/BookingRequest"
//import {ProtectedRoute} from "./ProtectedRoute"
import { useSelector } from "react-redux"
//import Signup from "./userAuth/signup/Signup"
import ServiceHistory from "../pages/serviceHistory/ServiceHistory"
import BookingDetail from '../pages/bookingDetail/BookingDetail'

export default function AppRouter(props) {

    const currentUser = useSelector((state) => state.currentUser)
    console.log(currentUser);

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user-form" component={UserDetail} />
                <Route exact path="/services/category/:categoryId" component={Service} />
                <Route exact path="/services/category" component={Category} />
                <Route exact path="/services/category/:categoryId/:serviceId" component={ServiceDetail} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/favourite-services" component={FavService} />
                <Route exact path='/booking-request' component={BookingRequest} />
                <Route exact path="/service-history" component={ServiceHistory} />
                <Route exact path="/booking-detail" component={BookingDetail} />
                <Route exact path="*" component={ NotFound } />
            </Switch>
        </Router>
    )
}