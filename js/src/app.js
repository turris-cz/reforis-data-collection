/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import DataCollection from "./data_collection/DataCollection";

const DataCollectionPlugin = {
    name: _("Data Collection"),
    weight: 100,
    path: "/data-collection",
    component: DataCollection,
    icon: "shield-alt",
};

ForisPlugins.push(DataCollectionPlugin);
