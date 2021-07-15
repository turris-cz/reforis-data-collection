/*
 * Copyright (c) 2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

export const sentinelSettingsFixture = {
    eula: 1,
    modules: {
        minipot: {
            enabled: false,
            installed: true,
            protocols: {
                ftp: true,
                http: true,
                smtp: true,
                telnet: true,
            },
        },
        fwlogs: {
            enabled: false,
            installed: true,
        },
        survey: {
            enabled: false,
            installed: true,
        },
    },
    token: "random_token",
};

export const sentinelStateFixture = {
    fwlogs: "disabled",
    minipot: "disabled",
    proxy: "running",
    survey: "disabled",
};
