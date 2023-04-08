import { styled } from "@mui/material";

export default function Category({ data }) {
  return (
    <Categories>
      {data.categories.map((item) => (
        <li key={item.name}>
          <Container>
            <LeftTab>
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "24px",
                  backgroundColor: `${item.color}`,
                  marginRight: "16px",
                }}
              ></span>
              <Name>{item.name}</Name>
            </LeftTab>
            <Name>{(item.total / 100).toFixed(2)}</Name>{" "}
          </Container>
        </li>
      ))}
    </Categories>
  );
}

const Name = styled("p")`
  font-size: 16px;
  line-height: 1.16;
`;

const LeftTab = styled("div")`
  display: flex;
  align-items: center;
`;

const Container = styled("div")`
  width: 280px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  margin-top: 16px;
  padding-bottom: 21px;
  border-bottom: 1px solid #dcdcdf;
  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.6);

  @media screen and (min-width: 768px) {
    width: 350px;
  }
`;

const Categories = styled("div")`
  margin: 0;
  padding: 0;
`;
