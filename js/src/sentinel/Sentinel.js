/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";

import { ForisForm, useAPIGet } from "foris";

import API_URLs from "../API";
import SentinelState from "./SentinelState/SentinelState";
import SentinelOptions from "./SentinelOptions/SentinelOptions";
import DisabledIfNotAccepted from "../utils/DisabledIfNotAccepted";

export default function Sentinel() {
    // We had to move API call up to pass it to the `postCallback` function
    const [sentinelComponentsState, getSentinelComponentsState] = useAPIGet(
        API_URLs.state
    );

    useEffect(() => {
        getSentinelComponentsState();
    }, [getSentinelComponentsState]);

    return (
        <>
            <h1>{_("Sentinel")}</h1>
            <p>
                {_(
                    "Sentinel is a Turris threat detection and attack prevention system, which provides dynamic firewall and statistics. Here you can set up several Sentinel components which take part in the threat detection subsystem."
                )}
            </p>
            <div id="sentinel-state" />
            <ForisForm
                forisConfig={{
                    endpoint: API_URLs.settings,
                }}
                postCallback={getSentinelComponentsState}
                prepDataToSubmit={prepDataToSubmit}
                validator={validator}
            >
                <SentinelState
                    apiState={sentinelComponentsState}
                    states={sentinelComponentsState}
                />
                <DisabledIfNotAccepted>
                    <SentinelOptions />
                </DisabledIfNotAccepted>
            </ForisForm>
        </>
    );
}

function prepDataToSubmit(data) {
    data.eula = parseInt(data.eula);
    if (!data.token) delete data.token;
    delete data.modules.survey.installed;
    delete data.modules.fwlogs.installed;
    delete data.modules.minipot.installed;
    return data;
}

// Hack to disable submit button
function validator(formData) {
    if (formData.eula !== 1) return { eula: 2 };
    return null;
}
