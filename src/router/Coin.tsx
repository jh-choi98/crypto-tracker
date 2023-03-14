import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import Price from "../components/Price";
import Chart from "../components/Chart";

const Container = styled.div`
  max-width: 550px;
  margin: 30px auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 45px;
  font-weight: 500;
`;
const Main = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-around;
  margin: 30px 0px;
  padding: 5px 0px;
  border-radius: 15px;
`;
const Loader = styled.h1`
  text-align: center;
  font-size: 20px;
`;
const MainItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  span {
    font-size: 20px;
  }
  span:first-child {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;
const Description = styled.p`
  font-size: 19px;
  line-height: 1.5em;
  padding-left: 8px;
`;
const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px 0px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  font-size: 20px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
    padding: 15px 100px;
  }
`;

interface IRouteParams {
  coinId: string;
}
interface IRouteState {
  name: string;
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<IRouteParams>();
  const { state } = useLocation<IRouteState>();
  const priceMatch = useRouteMatch(":coinId/price");
  const chartMatch = useRouteMatch(":coinId/chart");
  const { isLoading: loadingInfo, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: loadingPrice, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId)
  );
  const loading = loadingInfo || loadingPrice;

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Main>
            <MainItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </MainItem>
            <MainItem>
              <span>Price</span>
              <span>{`$ ${
                priceData?.quotes?.USD?.price.toFixed(4) ?? 0
              } US`}</span>
            </MainItem>
            <MainItem>
              <span>First Date</span>
              <span>{infoData?.first_data_at?.slice(0, 10)}</span>
            </MainItem>
          </Main>
          <Description>{infoData?.description}</Description>
          <Main>
            <MainItem>
              <span>Total Supply</span>
              <span>{priceData?.total_supply}</span>
            </MainItem>
            <MainItem>
              <span>Max Supply</span>
              <span>
                {priceData?.max_supply === 0 ? "NA" : priceData?.max_supply}
              </span>
            </MainItem>
          </Main>

          <TabContainer>
            <Tab isActive={priceMatch !== null}>
              <Link to={`${coinId}/price`}>PRICE</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`${coinId}/chart`}>CHART</Link>
            </Tab>
          </TabContainer>

          <Switch>
            <Route path=":coinId/price">
              <Price
                priceUSD={(priceData?.quotes?.USD?.price as number) ?? 0}
              />
            </Route>
            <Route path=":coinId/chart">
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
