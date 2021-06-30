/*
 * Copyright (C) 2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";
import { formFieldsSize, withSpinnerOnSending, withErrorMessage } from "foris";

import SentinelProxyStateIcon from "./SentinelProxyStateIcon";
import SentinelStateTable from "./SentinelStateTable";

SentinelState.propTypes = {
    apiState: PropTypes.object.isRequired,
    states: PropTypes.object.isRequired,
};

export default function SentinelState({ apiState, states }) {
    return (
        <div className={formFieldsSize}>
            <h2>{_("Sentinel State")}</h2>
            <StateWithErrorAndSpinner
                apiState={apiState.state}
                states={states.data}
            />
        </div>
    );
}

SentinelStateCard.propTypes = {
    states: PropTypes.object.isRequired,
};

function SentinelStateCard({ states }) {
    const isDisabled = states.proxy === "disabled";

    return (
        <div className="row no-gutters justify-content-center">
            <div className="col-md-6 d-flex flex-column align-items-center justify-content-center mt-3 mt-md-0">
                <SentinelProxyStateIcon
                    state={states.proxy}
                    disabled={isDisabled}
                />
                <p className="h4 mt-3">Sentinel</p>
            </div>
            <div className="col-md-6">
                <div className="card-body">
                    <SentinelStateTable states={states} disabled={isDisabled} />
                </div>
            </div>
        </div>
    );
}

const StateWithErrorAndSpinner = withSpinnerOnSending(
    withErrorMessage(SentinelStateCard)
);
