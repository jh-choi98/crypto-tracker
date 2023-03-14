import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./router/Coin";
import Coins from "./router/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path=":coinId">
          <Coin />
        </Route>
        <Route path="/crypto-tracker/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
