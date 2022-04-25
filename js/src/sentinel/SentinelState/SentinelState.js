/*
 * Copyright (C) 2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
    formFieldsSize,
    withSpinnerOnSending,
    withErrorMessage,
    CopyInput,
} from "foris";

import SentinelProxyStateIcon from "./SentinelProxyStateIcon";
import SentinelStateTable from "./SentinelStateTable";

SentinelState.propTypes = {
    sentinelState: PropTypes.object.isRequired,
};

export default function SentinelState({ formData, sentinelState }) {
    const stateContainer = document.getElementById("sentinel-state");

    const deviceToken = formData.token;

    return ReactDOM.createPortal(
        <div className={formFieldsSize}>
            <h2>{_("Sentinel State")}</h2>
            {deviceToken && (
                <p
                    dangerouslySetInnerHTML={{
                        __html: _(
                            `To view Sentinel data, please visit <a href="https://view.sentinel.turris.cz" target="_blank" rel="noopener noreferer">Sentinel View<sup><i class="fas fa-external-link-alt fa-xs ml-1"></i></sup></a>. There you can also see and filter <a href="https://view.sentinel.turris.cz/api/device/add?token=${deviceToken}" target="_blank" rel="noopener noreferer">data specific for your device<sup><i class="fas fa-external-link-alt fa-xs ml-1"></i></sup></a>.`
                        ),
                    }}
                />
            )}
            <StateWithErrorAndSpinner
                apiState={sentinelState.state}
                states={sentinelState.data}
                deviceToken={deviceToken}
            />
        </div>,
        stateContainer
    );
}

SentinelStateCard.propTypes = {
    states: PropTypes.object.isRequired,
    deviceToken: PropTypes.string,
};

function SentinelStateCard({ states, deviceToken }) {
    const isDisabled = states.proxy === "disabled";

    return (
        <>
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
                        <SentinelStateTable
                            states={states}
                            disabled={isDisabled}
                        />
                    </div>
                </div>
            </div>
            {deviceToken && (
                <CopyInput
                    label={_("Device token")}
                    value={deviceToken || ""}
                    helpText="That token allows you to access statistics from your device on Sentinel View."
                    readOnly
                />
            )}
        </>
    );
}

const StateWithErrorAndSpinner = withSpinnerOnSending(
    withErrorMessage(SentinelStateCard)
);
