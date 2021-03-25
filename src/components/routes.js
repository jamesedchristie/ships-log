import React from 'react';
import { Route, Switch } from 'react-router';
import { AddNote, Home, EditNote } from '../pages';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/Add"><AddNote /></Route>
      <Route path="/Edit/:routeIndex"><EditNote /></Route>
      <Route>
        404 not found. This is not the page you're looking for.
      </Route>
    </Switch>
  )
}