/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";
import {
    API_STATE, ErrorMessage, Spinner, useAPIGet,
} from "foris";

import API_URLs from "API";
import Eula from "./Eula";

export default function DataCollection() {
    const [getSettingsState, getSettings] = useAPIGet(API_URLs.settings);

    useEffect(() => {
        getSettings();
    }, [getSettings]);

    if (getSettingsState.state === API_STATE.INIT || getSettingsState.state === API_STATE.SENDING) {
        return <Spinner />;
    }

    if (getSettingsState.state === API_STATE.ERROR) {
        return <ErrorMessage />;
    }

    return (
        <>
            <h1>{_("Data Collection")}</h1>
            <p>{_("Participate in data collection and dynamic distributed firewall.")}</p>
            <Eula eula={getSettingsState.data.eula} />
        </>
    );
}
