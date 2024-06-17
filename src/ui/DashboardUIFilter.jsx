import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop),
})`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const DashboardUIFilter = ({ filterField }) => {
  //router hooks to store variables on the router (browsers url)
  const [searchParams, setSearchParams] = useSearchParams();

  const active = searchParams.get(filterField) || "7";

  const handleClick = (value) => {
    searchParams.set(filterField, value);

    setSearchParams(searchParams);
  };

  return (
    <StyledFilter>
      <FilterButton
        active={active === "7"}
        disabled={active === "7"}
        onClick={() => handleClick("7")}
      >
        Last 7 days
      </FilterButton>
      <FilterButton
        active={active === "30"}
        disabled={active === "30"}
        onClick={() => handleClick("30")}
      >
        Last 30 days
      </FilterButton>
      <FilterButton
        disabled={active === "90"}
        active={active === "90"}
        onClick={() => handleClick("90")}
      >
        Last 90 days
      </FilterButton>
    </StyledFilter>
  );
};

export default DashboardUIFilter;
