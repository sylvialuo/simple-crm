import styled from "styled-components";
import { Typography, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import theme from "./theme";

export const PageWrapper = styled.div``;
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
export const Title = styled(Typography)``;
export const SearchTextField = styled(TextField)`
  &&&&& {
    width: 18em;
    margin: -18px 0 0 0;
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
