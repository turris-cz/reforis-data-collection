/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";

import { ForisForm, useAPIGet } from "foris";

import API_URLs from "../API";
import SentinelOptions from "./SentinelOptions/SentinelOptions";
import SentinelState from "./SentinelState/SentinelState";
import DisabledIfNotAccepted from "../utils/DisabledIfNotAccepted";

export default function Sentinel() {
    // We had to move API call up to pass it to the `postCallback` function
    const [sentinelState, getSentinelState] = useAPIGet(API_URLs.state);

    useEffect(() => {
        getSentinelState();
    }, [getSentinelState]);

    const sentinelIntro = _(
        "Sentinel is a Turris threat detection and attack prevention system, which provides dynamic firewall and statistics. Here you can set up several Sentinel components which take part in the threat detection subsystem."
    );

    return (
        <>
            <h1>{_("Sentinel")}</h1>
            <p>{sentinelIntro}</p>
            <div id="sentinel-state" />
            <ForisForm
                forisConfig={{
                    endpoint: API_URLs.settings,
                }}
                postCallback={getSentinelState}
                prepDataToSubmit={prepDataToSubmit}
                validator={validator}
            >
                <SentinelState sentinelState={sentinelState} />
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
