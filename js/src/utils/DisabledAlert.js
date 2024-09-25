/*
 * Copyright (C) 2021-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Alert, ForisURLs } from "foris";
import { Link } from "react-router-dom";

export default function DisabledAlert() {
    return (
        <Alert type="warning">
            {_("Please accept the ")}
            <Link to={ForisURLs.sentinelLicenseAgreement}>
                {_("License Agreement")}
            </Link>
            {_(" to manage Sentinel.")}
        </Alert>
    );
}
