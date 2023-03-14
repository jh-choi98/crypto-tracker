import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Link } from "react-router-dom";
import { useState } from "react";

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
const Main = styled.div``;
const Loader = styled.h1`
  text-align: center;
  font-size: 20px;
`;
const Search = styled.input`
  margin-bottom: 60px;
  width: 550px;
  padding: 15px;
  border: none;
  font-size: 18px;
  background-color: inherit;
  border-bottom: 2px solid ${(props) => props.theme.textColor};
  transition: all 0.5s ease-in-out;
  color: ${(props) => props.theme.textColor};
  &:focus {
    background-color: ${(props) => props.theme.textColor};
    box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.3);
    color: ${(props) => props.theme.bgColor};
  }
`;
const CoinsList = styled.ul``;
const ListItem = styled.li`
  background-color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
  border-radius: 25px;
  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.bgColor};
    padding: 8px 15px;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 15px;
`;

interface ICoin {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}
function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const [userInput, setUserInput] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUserInput(value);
  };
  const filteredData =
    userInput === ""
      ? data
      : data?.filter((coin) =>
          coin.name.toLowerCase().includes(userInput.toLowerCase())
        );
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Main>
          <form onSubmit={onSubmit}>
            <Search
              value={userInput}
              placeholder="Search Coin..."
              onChange={onChange}
            />
          </form>
          <CoinsList>
            {filteredData?.slice(0, 100).map((coin) => (
              <ListItem key={coin.id}>
                <Link
                  to={{
                    pathname: `/crypto-tracker/${coin.id}`,
                    state: {
                      name: coin.name,
                    },
                  }}
                >
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt={coin.id}
                  />
                  {coin.name} &rarr;
                </Link>
              </ListItem>
            ))}
          </CoinsList>
        </Main>
      )}
    </Container>
  );
}

export default Coins;
