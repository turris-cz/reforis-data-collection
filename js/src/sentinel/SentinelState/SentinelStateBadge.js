/*
 * Copyright (c) 2021-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

SentinelStateBadge.propTypes = {
    state: PropTypes.string.isRequired,
};

export default function SentinelStateBadge({ state }) {
    let badgeName;
    let badgeColor;
    let badgeTitle = _("Status: ");
    switch (state) {
        case "running":
            badgeName = _("Running");
            badgeColor = "success";
            badgeTitle += _("Running");
            break;
        case "sending":
            badgeName = _("Sending");
            badgeColor = "info";
            badgeTitle += _("Sending");
            break;
        case "failed":
            badgeName = _("Failed");
            badgeColor = "danger";
            badgeTitle += _("Failed");
            break;
        case "disabled":
            badgeName = _("Disabled");
            badgeColor = "warning";
            badgeTitle += _("Disabled");
            break;
        case "uninstalled":
            badgeName = _("Uninstalled");
            badgeColor = "secondary";
            badgeTitle += _("Uninstalled");
            break;
        default:
            badgeName = _("Unknown");
            badgeColor = "secondary";
            badgeTitle += _("Unknown");
    }
    return (
        <span className={`badge text-bg-${badgeColor}`} title={badgeTitle}>
            {badgeName}
        </span>
    );
}
