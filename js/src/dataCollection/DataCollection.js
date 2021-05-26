/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { ForisForm } from "foris";
import API_URLs from "../API";
import EULA from "./EULA/EULA";
import SentinelOptions from "./sentinel/SentinelOptions";

export default function DataCollection() {
    return (
        <>
            <h1>{_("Data Collection")}</h1>
            <p>
                {_(
                    "Participate in data collection and a dynamic distributed firewall."
                )}
            </p>
            <ForisForm
                forisConfig={{
                    endpoint: API_URLs.settings,
                }}
                prepDataToSubmit={prepDataToSubmit}
            >
                <EULA />
                <SentinelOptions />
            </ForisForm>
        </>
    );
}

function prepDataToSubmit(data) {
    data.eula = parseInt(data.eula);
    if (!data.token) delete data.token;
    delete data.modules.survey.installed;
    delete data.modules.nikola.installed;
    delete data.modules.minipot.installed;
    return data;
}
