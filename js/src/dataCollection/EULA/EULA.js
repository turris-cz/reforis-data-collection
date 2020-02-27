/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState } from "react";
import { ForisForm } from "foris";

import "./EULA.css";
import API_URLs from "API";
import EULAModal from "./EULAModal";
import EULAForm from "./EULAForm";

export default function EULA() {
    const [shown, setShown] = useState(false);

    function onModalToggle() {
        setShown((currentShown) => !currentShown);
    }

    return (
        <>
            <h3>{_("License Agreement")}</h3>
            <p>
                {_("It's required to confirm the Terms of Participation in Turris Project to participate in data collection.")}
            </p>
            <ForisForm
                forisConfig={{
                    endpoint: API_URLs.settings,
                }}
                prepDataToSubmit={prepDataToSubmit}
            >
                <EULAForm onModalToggle={onModalToggle} />
                <EULAModal
                    shown={shown}
                    setShown={setShown}
                />
            </ForisForm>
        </>
    );
}

function prepDataToSubmit(data) {
    data.eula = parseInt(data.eula);
    if (!data.token) delete data.token;
    return data;
}
