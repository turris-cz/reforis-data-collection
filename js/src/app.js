/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import DataCollection from "./dataCollection/DataCollection";
import Sentinel from "./sentinel/Sentinel";

const DataCollectionPlugin = {
    name: _("Sentinel"),
    weight: 100,
    path: "/sentinel",
    submenuId: "sentinel",
    icon: "database",
    pages: [
        {
            name: _("Sentinel"),
            path: "/sentinel",
            component: Sentinel,
        },
        {
            name: _("Data Collection"),
            path: "/data-collection",
            component: DataCollection,
        },
    ],
};

ForisPlugins.push(DataCollectionPlugin);
