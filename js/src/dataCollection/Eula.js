/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
    API_STATE, Button, ErrorMessage, Spinner, useAPIGet, useAPIPost,
} from "foris";

import "./Eula.css";
import API_URLs from "../API";

Eula.propTypes = {
    eula: PropTypes.number.isRequired,
};

export default function Eula({ eula }) {
    const [getEulaState, getEula] = useAPIGet(API_URLs.eula);

    useEffect(() => {
        getEula({ data: { eula } });
    }, [eula, getEula]);

    const [setSettingsState, setSettings] = useAPIPost(API_URLs.settings);
    function onAcceptEula() {
        setSettings({ data: { eula: getEulaState.data.eula } });
    }

    if (getEulaState.state === API_STATE.INIT || getEulaState.state === API_STATE.SENDING) {
        return <Spinner />;
    }

    if (getEulaState.state === API_STATE.ERROR) {
        return <ErrorMessage />;
    }

    return (
        <>
            <h3>{_("License Agreement")}</h3>
            <div className="display-linebreak">
                {getEulaState.data.text}
            </div>
            <Button
                onClick={onAcceptEula}
                loading={setSettingsState.state === API_STATE.SENDING}
            >
                {_("I Accept")}
            </Button>
        </>
    );
}
