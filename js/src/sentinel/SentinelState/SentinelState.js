/*
 * Copyright (C) 2021-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    formFieldsSize,
    withSpinnerOnSending,
    withErrorMessage,
    CopyInput,
} from "foris";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import SentinelProxyStateIcon from "./SentinelProxyStateIcon";
import SentinelStateTable from "./SentinelStateTable";

SentinelState.propTypes = {
    sentinelState: PropTypes.object.isRequired,
};

export default function SentinelState({ formData, sentinelState }) {
    const stateContainer = document.getElementById("sentinel-state");

    const deviceToken = formData.token;

    return createPortal(
        <div className={formFieldsSize}>
            <h2>{_("Sentinel State")}</h2>
            {deviceToken && (
                <p>
                    {_("To view Sentinel data, please visit ")}
                    <a
                        href="https://view.sentinel.turris.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Sentinel View
                        <sup>
                            <FontAwesomeIcon
                                icon={faExternalLinkAlt}
                                className="fa-xs ms-1"
                            />
                        </sup>
                    </a>
                    . {_("There you can also see and filter ")}
                    <a
                        href={`https://view.sentinel.turris.cz/api/device/add?token=${deviceToken}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        data specific for your device
                        <sup>
                            <FontAwesomeIcon
                                icon={faExternalLinkAlt}
                                className="fa-xs ms-1"
                            />
                        </sup>
                    </a>
                    .
                </p>
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
                    <p className="h4">Sentinel</p>
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
