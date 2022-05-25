import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom"
import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Service from '../pages/Services/Service'
import ServiceInfo from "../pages/Services/ServiceInfo"
import Category from "../pages/Services/Category"
import About from "../pages/About"
import NotFound from "./NotFound"
import Profile from "./profile/Profile"
import FavService from "../pages/favServices/FavService"
import BookingRequest from "../pages/bookingRequest/BookingRequest"
import ServiceHistory from "../pages/serviceHistory/ServiceHistory"
import BookingDetail from '../pages/bookingDetail/BookingDetail'
import { useAuth } from "../contexts/AuthContext"
import MyService from "../pages/myServices/MyService"
import MyServiceInfo from "../pages/myServices/MyServiceInfo"
import Loading from "./Loading"
//import Navbar from "./navbar/Navbar"
import LoginPage from '../pages/AuthPage/LoginPage'
//import Profilebar from "./profilebar/Profilebar"
import StripeContainer from "./payment/StripeContainer"


export default function AppRouter() {

    const { currentUser } = useAuth()
    

  
    return (
        <Router>
            {/* {currentUser ? <Profilebar /> : <Navbar />} */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/about" component={About} />
                <Route exact path="/services/category/:categoryId" component={Service} />
                <Route exact path="/services/category" component={Category} />
                <Route exact path="/services/category/:categoryId/:serviceId" component={ServiceInfo} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <Route exact path="/favourite-services" component={FavService} />
                <Route exact path='/booking-request' component={BookingRequest} />
                <Route exact path="/service-history" component={ServiceHistory} />
                <Route exact path="/booking-detail" component={BookingDetail} />
                <ProtectedRoute exact path="/create-services" component={MyService} />
                <ProtectedRoute exact path='/my-service/:serviceId' component={MyServiceInfo} />
                <ProtectedRoute exact path='/loading' component={Loading} />
                <ProtectedRoute exact path='/login' component={LoginPage} />
                <Route exact path="/pay" component={StripeContainer} />
                <Route exact path="*" component={NotFound} />
                
            </Switch>
        </Router>
    )
}

function ProtectedRoute(props) {

    const location = useLocation()
    const { currentUser } = useAuth()
    const { path } = props


    if (path === '/login') {

        //console.log(location.state.from);

        return currentUser ? (
            <Redirect to={location.state?.from ?? '/'} /> )
            : (<Route {...props} />)
    }

    return currentUser ? (<Route {...props} />) :
        (<Redirect to={{
            pathname: '/login',
            state: { from: location.pathname }
        }} />)
}
