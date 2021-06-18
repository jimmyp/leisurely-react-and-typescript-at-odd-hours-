import { Tabs, Tab } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router";
import { appHistory } from "./history";

export const Nav = () => {
    const location = useLocation();

    return (
        <Tabs value={location.pathname.split('/')[1]}>
            <Tab label="Photos" value={'photos'} disabled />
            <Tab label="Search" value={'search'} onClick={() => appHistory.push('/search')} />
        </Tabs>
    );
}