import Loading from "components/shared-components/Loading";
import React, {lazy, Suspense} from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Clients = ({ match }) => {
    return (
    <Suspense fallback={<Loading cover="content"/>}>
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/address`} />    
            <Route path={`${match.url}/address`} component={lazy(() => import(`./address`))} />
            <Route path={`${match.url}/geozone`} component={lazy(() => import(`./geozone`))} />
        </Switch>
    </Suspense>
    )
}

export default Clients
