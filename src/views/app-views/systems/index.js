import Loading from "components/shared-components/Loading";
import React, {lazy, Suspense} from "react";
import {  Route, Switch } from "react-router-dom";

const Systems = ({ match }) => {
    return (
    <Suspense fallback={<Loading cover="content"/>}>
        <Switch>
            <Route path={`${match.url}/mobile-apps`} component={lazy(() => import(`./mobile-apps`))} />
            <Route path={`${match.url}/logs`} component={lazy(() => import(`./logs`))} />
            <Route path={`${match.url}/setting`} component={lazy(() => import(`./setting`))} />
        </Switch>
    </Suspense>
    )
}

export default Systems