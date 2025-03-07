/*
 * Copyright (C) 2021-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

export const EULAFixture = {
    eula: 0,
    modules: {
        minipot: {
            enabled: true,
            installed: true,
            protocols: {
                ftp: true,
                http: true,
                smtp: true,
                telnet: true,
            },
        },
        nikola: {
            enabled: true,
            installed: true,
        },
        survey: {
            enabled: true,
            installed: false,
        },
    },
    token: "random_token",
};
