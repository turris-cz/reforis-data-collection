/*
 * Copyright (C) 2020-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import LicenseAgreement from "./licenseAgreement/LicenseAgreement";
import Sentinel from "./sentinel/Sentinel";

const SentinelPlugin = {
    name: _("Sentinel"),
    weight: 100,
    path: "/sentinel",
    submenuId: "sentinel",
    icon: "database",
    pages: [
        {
            name: _("Overview"),
            path: "/overview",
            component: Sentinel,
        },
        {
            name: _("License Agreement"),
            path: "/agreement",
            component: LicenseAgreement,
        },
    ],
};

ForisPlugins.push(SentinelPlugin);
