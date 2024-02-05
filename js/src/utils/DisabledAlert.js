/*
 * Copyright (C) 2021-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Alert, ForisURLs } from "foris";

export default function DisabledAlert() {
    const message = _(
        `Please accept the <a href="${ForisURLs.sentinelAgreement}">License Agreement</a> to manage Sentinel.`
    );
    // <Alert /> is used instead of context because warning isn't result of any action on this page
    return (
        <Alert type="warning">
            <span dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
    );
}
