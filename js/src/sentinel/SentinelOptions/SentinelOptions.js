/*
 * Copyright (C) 2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { CheckBox } from "foris";
import HELP_TEXTS from "./helpTexts";

SentinelOptions.propTypes = {
    formData: PropTypes.shape({
        eula: PropTypes.number.isRequired,
        modules: PropTypes.shape({
            nikola: PropTypes.object,
            survey: PropTypes.object,
            minipot: PropTypes.shape({
                enabled: PropTypes.bool,
                installed: PropTypes.bool,
                protocols: PropTypes.shape({
                    ftp: PropTypes.bool,
                    smtp: PropTypes.bool,
                    http: PropTypes.bool,
                    telnet: PropTypes.bool,
                }),
            }),
        }),
    }),
    setFormValue: PropTypes.func,
    disabled: PropTypes.bool,
};

export default function SentinelOptions({ formData, setFormValue, disabled }) {
    if (formData.eula !== 1) return null;
    return (
        <>
            <h2>{_(`Sentinel Components`)}</h2>
            <p>
                {_(`You can select specific components that you want \
to enable or disable.`)}
            </p>
            <CheckBox
                label={_("Enable Firewall Logs")}
                checked={
                    formData.modules.nikola.installed &&
                    formData.modules.nikola.enabled
                }
                helpText={HELP_TEXTS.firewallLogs}
                onChange={setFormValue((value) => ({
                    modules: {
                        nikola: { enabled: { $set: value } },
                    },
                }))}
                disabled={!formData.modules.nikola.installed}
            />
            <CheckBox
                label={_("Enable Minipots")}
                checked={
                    formData.modules.minipot.installed &&
                    formData.modules.minipot.enabled
                }
                helpText={HELP_TEXTS.minipots}
                onChange={setFormValue((value) => ({
                    modules: {
                        minipot: { enabled: { $set: value } },
                    },
                }))}
                disabled={!formData.modules.minipot.installed}
            />
            {formData.modules.minipot.installed &&
                formData.modules.minipot.enabled && (
                    <div className="option">
                        <CheckBox
                            label="HTTP"
                            checked={formData.modules.minipot.protocols.http}
                            onChange={setFormValue((value) => ({
                                modules: {
                                    minipot: {
                                        protocols: {
                                            http: { $set: value },
                                        },
                                    },
                                },
                            }))}
                            helpText={_("Running on port 80.")}
                            disabled={disabled}
                        />
                        <CheckBox
                            label="FTP"
                            checked={formData.modules.minipot.protocols.ftp}
                            onChange={setFormValue((value) => ({
                                modules: {
                                    minipot: {
                                        protocols: {
                                            ftp: { $set: value },
                                        },
                                    },
                                },
                            }))}
                            helpText={_("Running on port 21.")}
                            disabled={disabled}
                        />
                        <CheckBox
                            label="SMTP"
                            checked={formData.modules.minipot.protocols.smtp}
                            onChange={setFormValue((value) => ({
                                modules: {
                                    minipot: {
                                        protocols: {
                                            smtp: { $set: value },
                                        },
                                    },
                                },
                            }))}
                            helpText={_("Running on port 25 and 587.")}
                            disabled={disabled}
                        />
                        <CheckBox
                            label="Telnet"
                            checked={formData.modules.minipot.protocols.telnet}
                            onChange={setFormValue((value) => ({
                                modules: {
                                    minipot: {
                                        protocols: {
                                            telnet: { $set: value },
                                        },
                                    },
                                },
                            }))}
                            helpText={_("Running on port 23.")}
                            disabled={disabled}
                        />
                    </div>
                )}
            <CheckBox
                label={_("Enable Survey")}
                checked={
                    formData.modules.survey.installed &&
                    formData.modules.survey.enabled
                }
                helpText={HELP_TEXTS.survey}
                onChange={setFormValue((value) => ({
                    modules: {
                        survey: { enabled: { $set: value } },
                    },
                }))}
                disabled={!formData.modules.survey.installed}
            />
        </>
    );
}
