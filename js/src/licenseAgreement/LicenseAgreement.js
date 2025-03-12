/*
 * Copyright (C) 2020-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { ForisForm } from "foris";

import API_URLs from "../API";
import EULA from "./EULA/EULA";

export default function LicenseAgreement() {
    return (
        <>
            <h1>{_("License Agreement")}</h1>
            <p>
                {_(
                    "It's required to confirm the Terms of Participation in Turris Project to participate in the threat detection program."
                )}
            </p>
            <ForisForm
                forisConfig={{
                    endpoint: API_URLs.settings,
                }}
                prepDataToSubmit={prepDataToSubmit}
            >
                <EULA />
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
