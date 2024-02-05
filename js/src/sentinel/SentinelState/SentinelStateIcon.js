/*
 * Copyright (c) 2021-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

SentinelStateIcon.propTypes = {
    state: PropTypes.string.isRequired,
};

export default function SentinelStateIcon({ state }) {
    let icon;
    let iconColor;
    switch (state) {
        case "running":
            icon = "check";
            iconColor = "success";
            break;
        case "sending":
            icon = "angle-double-right";
            iconColor = "info";
            break;
        case "failed":
            icon = "times";
            iconColor = "danger";
            break;
        case "disabled":
            icon = "exclamation-triangle";
            iconColor = "warning";
            break;
        case "uninstalled":
            icon = "exclamation-triangle";
            iconColor = "secondary";
            break;
        default:
            icon = "minus";
            iconColor = "secondary";
    }
    return (
        <span className={`text-${iconColor}`}>
            <i className={`fas fa-${icon}`} />
        </span>
    );
}
