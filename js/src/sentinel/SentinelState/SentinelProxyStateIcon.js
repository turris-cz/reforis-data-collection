/*
 * Copyright (c) 2021-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

SentinelProxyStateIcon.propTypes = {
    state: PropTypes.string,
    disabled: PropTypes.bool,
};

export default function SentinelProxyStateIcon({ state, disabled }) {
    if (disabled) state = "disabled";
    let iconColor;
    let iconTitle = _("Status: ");
    switch (state) {
        case "running":
            iconColor = "success";
            iconTitle += _("Running");
            break;
        case "sending":
            iconColor = "info";
            iconTitle += _("Sending");
            break;
        case "failed":
            iconColor = "danger";
            iconTitle += _("Failed");
            break;
        case "disabled":
            iconColor = "warning";
            iconTitle += _("Disabled");
            break;
        case "uninstalled":
            iconColor = "secondary";
            iconTitle += _("Uninstalled");
            break;
        default:
            iconColor = "secondary";
            iconTitle += _("Unknown");
    }
    return (
        <span className={`text-${iconColor}`}>
            <i className="fas fa-database fa-5x mb-1" title={iconTitle} />
        </span>
    );
}
