import React from "react";

import { Route, Switch } from "react-router-dom";

import DocumentoLote from "../views/DocumentoLote";

function Routes() {
  return (
    <Switch>
      <Route path="/dbccompany" exact component={DocumentoLote} />
    </Switch>
  );
}

export default Routes;
