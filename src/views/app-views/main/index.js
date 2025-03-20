import Loading from "components/shared-components/Loading";
import React, {lazy, Suspense} from "react";
import {  Route, Switch } from "react-router-dom";

const Main = ({ match }) => {
    return (
    <Suspense fallback={<Loading cover="content"/>}>
        <Switch>
            <Route path={`${match.url}/dashboard`} component={lazy(() => import(`./dashboard`))} />
            <Route path={`${match.url}/catalog`} component={lazy(() => import(`./catalog`))} />
            <Route path={`${match.url}/clients`} component={lazy(() => import(`./clients`))} />
            <Route path={`${match.url}/orders`} component={lazy(() => import(`./orders`))} />
            <Route path={`${match.url}/banners`} component={lazy(() => import(`./banners`))} />
            <Route path={`${match.url}/promocods`} component={lazy(() => import(`./promocods`))} />
            <Route path={`${match.url}/scheduler`} component={lazy(() => import(`./scheduler`))} />
            <Route path={`${match.url}/offline-points`} component={lazy(() => import(`./offline-points`))} />
            <Route path={`${match.url}/employees`} component={lazy(() => import(`./employees`))} />
            <Route path={`${match.url}/mailings`} component={lazy(() => import(`./mailings`))} />
        </Switch>
    </Suspense>
    )
}

export default Main
