import Loading from "components/shared-components/Loading";
import React, {lazy, Suspense} from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Clients = ({ match }) => {
    return (
    <Suspense fallback={<Loading cover="content"/>}>
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/user-list`} />    
            <Route path={`${match.url}/user-list`} component={lazy(() => import(`./user-list`))} />
            <Route path={`${match.url}/user-group`} component={lazy(() => import(`./user-group`))} />
            <Route path={`${match.url}/setting`} component={lazy(() => import(`./setting`))} />
        </Switch>
    </Suspense>
    )
}

export default Clients
