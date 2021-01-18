import styled from "styled-components";
import { Typography, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import theme from "./theme";

export const PageWrapper = styled.div`
  margin: 4rem;
  min-width: 60rem;
`;
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2rem;
`;
export const SearchBarAddButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
export const Title = styled(Typography)`
  font-family: Arial, Helvetica, sans-serif;
  color: ${theme.palette.secondary.main};
`;
export const SearchTextField = styled(TextField)`
  &&&&& {
    width: 30vw;
    min-width: 20rem;
    > div {
      &::after {
        border-bottom-color: ${theme.palette.secondary.main};
      }
    }
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  color: ${theme.palette.primary.main};
`;
