import Loading from "components/shared-components/Loading";
import React, {lazy, Suspense} from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Catalog = ({ match }) => {
    return (
    <Suspense fallback={<Loading cover="content"/>}>
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/products`} />    
            <Route path={`${match.url}/products`} component={lazy(() => import(`./products`))} />
            <Route path={`${match.url}/categories`} component={lazy(() => import(`./categories`))} />
			<Route path={`${match.url}/collections`} component={lazy(() => import(`./collections`))} />
            <Route path={`${match.url}/combo`} component={lazy(() => import(`./combo`))} />
        </Switch>
    </Suspense>
    )
}

export default Catalog
