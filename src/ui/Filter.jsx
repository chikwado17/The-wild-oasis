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

const Filter = () => {
  //router hooks to store variables on the router (browsers url)
  const [searchParams, setSearchParams] = useSearchParams();

  const active = searchParams.get("discount") || "all";

  const handleClick = (value) => {
    searchParams.set("discount", value);
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
        active={active === "no-discount"}
        disabled={active === "no-discount"}
        onClick={() => handleClick("no-discount")}
      >
        No discount
      </FilterButton>
      <FilterButton
        disabled={active === "with-discount"}
        active={active === "with-discount"}
        onClick={() => handleClick("with-discount")}
      >
        with discount
      </FilterButton>
    </StyledFilter>
  );
};

export default Filter;
