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

const FilterButton = styled.button`
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

const Filter = ({ filterField }) => {
  //router hooks to store variables on the router (browsers url)
  const [searchParams, setSearchParams] = useSearchParams();

  const active = searchParams.get(filterField) || "all";

  const handleClick = (value) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };

  return (
    <StyledFilter>
      <FilterButton
        active={active === "all"}
        disabled={active === "all"}
        onClick={() => handleClick("all")}
      >
        All
      </FilterButton>
      <FilterButton
        active={active === "checked-out"}
        disabled={active === "checked-out"}
        onClick={() => handleClick("checked-out")}
      >
        Checked out
      </FilterButton>
      <FilterButton
        disabled={active === "checked-in"}
        active={active === "checked-in"}
        onClick={() => handleClick("checked-in")}
      >
        Checked in
      </FilterButton>
      <FilterButton
        disabled={active === "unconfirmed"}
        active={active === "unconfirmed"}
        onClick={() => handleClick("unconfirmed")}
      >
        Unconfirmed
      </FilterButton>
    </StyledFilter>
  );
};

export default Filter;
