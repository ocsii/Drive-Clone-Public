import React from "react";
import styled from "styled-components";

import { Search as SearchIcon } from "@mui/icons-material";
import { FormatAlignCenter as FormatAlignCenterIcon } from "@mui/icons-material";
import { HelpOutline as HelpOutlineIcon } from "@mui/icons-material";
import { Settings as SettingsIcon } from "@mui/icons-material";
import { Apps as AppsIcon } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Settings as SettingsIconMUI } from "@mui/icons-material";

const HeaderContainer = styled.div`
  // HeaderContainer
  display: grid;
  grid-template-columns: 250px auto 200px; // 300 auto 200
  padding: 5px 30px; //5 20
  height: 60px;
  align-items: center;
  // border-bottom: 1px solid lightgray;
`;

const LogoIcon = styled.div`
  // HeaderLogo
  display: flex;
  align-items: center;
  img {
    width: 38px;
  }
  span {
    font-size: 20px;
    margin-left: 10px;
    color: gray;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
  width: 700px;
  background-color: rgb(233, 238, 246);
  padding: 12px;
  border-radius: 30px;
  input {
    background-color: transparent;
    border: none;
    outline: none;
    flex: 1;
    font-size: 16px;
  }
`;

const IconsContainer = styled.div`
  // display: flex;
  // align-items: right;
  // span {
  //     display: flex;
  //     align-items: right;
  //     margin-left: 20px;
  // }
  // svg.MuiSvgIcon-root {
  //     margin-right: 0px 5px;
  // }
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Header = ({ photoURL }) => {
  return (
    <HeaderContainer>
      <LogoIcon>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"
          alt="Google Drive Logo"
        />

        <span>NOT Drive</span>
      </LogoIcon>

      <HeaderSearch>
        <SearchIcon style={{ margin: "0px 10px 0px 0px" }} />
        <input type="text" placeholder="Search in Drive" />
        {/* <FormatAlignCenterIcon /> */}
      </HeaderSearch>

      <IconsContainer>
        {/* <span>
            <HelpOutlineIcon />
            <SettingsIcon />
        </span> */}

        <span>
          {/* <AppsIcon /> */}
          <Avatar src={photoURL} />
        </span>
      </IconsContainer>
    </HeaderContainer>
  );
};

export default Header;
