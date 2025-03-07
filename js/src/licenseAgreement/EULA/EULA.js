/*
 * Copyright (C) 2020-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState } from "react";

import PropTypes from "prop-types";

import EULAForm from "./EULAForm";
import EULAModal from "./EULAModal";

import "./EULA.css";

EULA.propTypes = {
    formData: PropTypes.object,
    setFormValue: PropTypes.func,
    disabled: PropTypes.bool,
};

export default function EULA({ formData, setFormValue, disabled }) {
    const [shown, setShown] = useState(false);

    return (
        <>
            <EULAForm
                formData={formData}
                setFormValue={setFormValue}
                disabled={disabled}
                onModalToggle={() => setShown((currentShown) => !currentShown)}
            />
            <EULAModal formData={formData} shown={shown} setShown={setShown} />
        </>
    );
}
