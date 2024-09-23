/*
 * Copyright (c) 2021-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import {
    faAngleDoubleRight,
    faExclamationTriangle,
    faMinus,
    faTimes,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

SentinelStateIcon.propTypes = {
    state: PropTypes.string.isRequired,
};

export default function SentinelStateIcon({ state }) {
    let icon;
    let iconColor;

    switch (state) {
        case "running":
            icon = faCheck;
            iconColor = "success";
            break;
        case "sending":
            icon = faAngleDoubleRight;
            iconColor = "info";
            break;
        case "failed":
            icon = faTimes;
            iconColor = "danger";
            break;
        case "disabled":
            icon = faExclamationTriangle;
            iconColor = "warning";
            break;
        case "uninstalled":
        default:
            icon = faMinus;
            iconColor = "secondary";
    }

    return <FontAwesomeIcon icon={icon} className={`text-${iconColor}`} />;
}
