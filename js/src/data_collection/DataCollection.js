/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";

import { useAPIGet } from "foris";

import API_URLs from "API";

export default function DataCollection() {
    const [, getExample] = useAPIGet(API_URLs.example);
    useEffect(() => {
        getExample();
    }, [getExample]);

    return (
        <>
            <h1>{_("Data Collection")}</h1>
            <p>{_("Participate in data collection and dynamic distributed firewall.")}</p>
        </>
    );
}
