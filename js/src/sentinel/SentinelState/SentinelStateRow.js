/*
 * Copyright (c) 2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import SentinelStateBadge from "./SentinelStateBadge";
import SentinelStateIcon from "./SentinelStateIcon";

SentinelStateRow.propTypes = {
    name: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
};

export default function SentinelStateRow({ name, state }) {
    return (
        <tr>
            <th scope="row">{name}</th>
            <td>
                <SentinelStateIcon state={state} />
            </td>
            <td className="text-center">
                <SentinelStateBadge state={state} />
            </td>
        </tr>
    );
}
