import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCurrencyExchange } from "../api";

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
  background-color: rgba(0, 0, 0, 0.5);
  margin: 30px 0px;
  padding: 10px 0px;
  border-radius: 15px;
  color: white;
  span {
    font-size: 22px;
  }
  span:first-child {
    margin-bottom: 15px;
    font-size: 18px;
  }
`;
const Label = styled.label`
  margin-bottom: 10px;
  font-size: 20px;
`;
const Select = styled.select`
  padding: 0px 15px;
  font-size: 18px;
  border-radius: 5px;
`;

interface IRouteParams {
  coinId: string;
}

interface IPriceProps {
  priceUSD: number;
}

function Price({ priceUSD }: IPriceProps) {
  const { coinId } = useParams<IRouteParams>();
  const [currency, setCurrency] = useState("KRW");
  const { isLoading, data, refetch } = useQuery(["currency", coinId], () =>
    fetchCurrencyExchange(currency)
  );
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency("");
    const {
      currentTarget: { value },
    } = event;
    setCurrency(value);
  };
  useEffect(() => {
    refetch();
  }, [currency]);
  console.log(currency);
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Overview>
          <OverviewItem>
            <Label htmlFor="currency">Choose currency</Label>
            <Select id="currency" onChange={onChange} value={currency}>
              <option value="KRW">KRW</option>
              <option value="CAD">CAD</option>
              <option value="EUR">EUR</option>
              <option value="AUD">AUD</option>
              <option value="CNH">CNH</option>
            </Select>
          </OverviewItem>
          <OverviewItem>
            <span>Exchange Rate</span>
            <span>{`1 USD \u2192 ${Number(data).toFixed(3)} ${currency}`}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Price in {currency}</span>
            <span>{`${(priceUSD * Number(data)).toFixed(2)} ${currency}`}</span>
          </OverviewItem>
        </Overview>
      )}
    </div>
  );
}

export default Price;
