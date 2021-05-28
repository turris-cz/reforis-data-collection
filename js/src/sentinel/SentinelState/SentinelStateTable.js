/*
 * Copyright (c) 2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import SentinelStateRow from "./SentinelStateRow";

SentinelStateTable.propTypes = {
    states: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
};

export default function SentinelStateTable({ states, disabled }) {
    if (disabled) states.proxy = "disabled";
    const proxyNotRunning = states.proxy !== "running";
    return (
        <div className="table-responsive">
            <table className="table table-borderless table-hover mb-0">
                <tbody>
                    <SentinelStateRow
                        name={_("Sentinel Proxy")}
                        state={states.proxy}
                    />
                    <SentinelStateRow
                        name={_("Firewall Logs")}
                        state={proxyNotRunning ? "unknown" : states.fwlogs}
                    />
                    <SentinelStateRow
                        name={_("Minipots")}
                        state={proxyNotRunning ? "unknown" : states.minipot}
                    />
                    <SentinelStateRow
                        name={_("Survey")}
                        state={proxyNotRunning ? "unknown" : states.survey}
                    />
                </tbody>
            </table>
        </div>
    );
}
