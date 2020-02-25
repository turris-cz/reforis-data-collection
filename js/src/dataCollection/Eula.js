/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    API_STATE, Button, ErrorMessage, ForisForm, Modal, ModalBody, ModalHeader, RadioSet, Spinner, useAPIGet,
} from "foris";

import "./Eula.css";
import API_URLs from "../API";

const EULA_CHOICES = [
    { value: "0", label: _("I do not accept the Terms of Participation in Turris Project (Data Collection)") },
    { value: "1", label: _("I accept the Terms of Participation in Turris Project (Data Collection)") },
];

Eula.propTypes = {
    eula: PropTypes.number.isRequired,
};

export default function Eula({ eula }) {
    const { shown, setShown } = useState(false);
    return (
        <>
            <ForisForm
                forisConfig={{
                    endpoint: API_URLs.settings,
                }}
                prepDataToSubmit={prepDataToSubmit}
            >
                <h3>{_("License Agreement")}</h3>
                <Button forisFormSize className="btn-outline-info">
                    {_("Show Terms of Participation in Turris Project (Data Collection).")}
                </Button>
                <EULAForm />
                <EULAModal
                    shown={shown}
                    setShown={setShown}
                />
            </ForisForm>
        </>
    );
}

function EULAForm({
    formData, setFormValue, formErrors, ...props
}) {
    return (
        <>
            <RadioSet
                choices={EULA_CHOICES}
                name={_("Agreement")}
                value={formData.eula.toString()}
                onChange={
                    setFormValue((value) => ({ eula: { $set: value } }))
                }
                {...props}
            />
        </>
    );
}

function prepDataToSubmit(data) {
    data.eula = parseInt(data.eula);
    if (!data.token) delete data.token;
    return data;
}

function EULAModal({ shown, setShown, formData }) {
    const { eula } = formData;
    const [getEulaState, getEula] = useAPIGet(API_URLs.eula);

    useEffect(() => {
        getEula({ data: { eula } });
    }, [eula, getEula]);

    let content;
    if (getEulaState.state === API_STATE.INIT || getEulaState.state === API_STATE.SENDING) {
        content = <Spinner />;
    } else if (getEulaState.state === API_STATE.ERROR) {
        content = <ErrorMessage />;
    } else {
        content = (
            <div className="display-linebreak">
                {getEulaState.data.text}
            </div>
        );
    }

    return (
        <>
            <Modal setShown={setShown} shown={shown}>
                <ModalHeader setShown={setShown} title={_("Wi-Fi QR Code")} />
                <ModalBody>
                    {content}
                </ModalBody>
            </Modal>
        </>
    );
}
