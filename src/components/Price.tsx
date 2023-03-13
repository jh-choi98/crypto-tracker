import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchExchangeCad } from "../api";

const Loader = styled.h1`
  text-align: center;
  font-size: 20px;
`;

const Overview = styled.div``;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 20px;
  }
  span:first-child {
    margin-bottom: 15px;
  }
`;

interface IRouteParams {
  coinId: string;
}

interface IPriceProps {
  priceUSD: number;
}

function Price({ priceUSD }: IPriceProps) {
  const { coinId } = useParams<IRouteParams>();
  const { isLoading, data } = useQuery(["currency", coinId], fetchExchangeCad);
  const dataNum = Number(data);
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Overview>
          <OverviewItem>
            <span>Exchange Rate</span>
            <span>{`1 USD \u2192 ${dataNum.toFixed(3)} CAD`}</span>
          </OverviewItem>
          <OverviewItem>
            <span>CAD Price</span>
            <span>{`${(priceUSD * dataNum).toFixed(2)} CAD`}</span>
          </OverviewItem>
        </Overview>
      )}
    </div>
  );
}

export default Price;
