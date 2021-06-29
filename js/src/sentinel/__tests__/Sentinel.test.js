/*
 * Copyright (C) 2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {
    render,
    wait,
    fireEvent,
} from "foris/testUtils/customTestRender";

import Sentinel from "../Sentinel";
import mockAxios from "jest-mock-axios";
import { sentinelStateFixture, sentinelSettingsFixture } from "./__fixtures__/sentinelFixture";

describe("<Sentinel />", () => {
    let asFragment;
    let firstRender;
    let getByText;

    beforeEach(async () => {
        const renderRes = render(<Sentinel />);
        mockAxios.mockResponse({ data: sentinelSettingsFixture });
        getByText = renderRes.getByText;
        asFragment = renderRes.asFragment;

        await wait(() => getByText("Enable Firewall Logs"));

        mockAxios.mockResponse({ data: sentinelStateFixture });

        await wait(() => getByText("Sentinel Proxy"));
        firstRender = renderRes.asFragment();
    });

    it("Snapshot of Sentinel", () => {
        getByText("Sentinel Components");
        expect(firstRender).toMatchSnapshot();
    });
    
    it("Success post request", () => {
        fireEvent.click(getByText("Enable Firewall Logs"));
    
        fireEvent.click(getByText("Save"));
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/data-collection/api/settings",
            {
                eula: 1,
                modules: {
                    minipot: {
                        enabled: false,
                        protocols: {
                            ftp: true,
                            http: true,
                            smtp: true,
                            telnet: true,
                        },
                    },
                    nikola: { enabled: true },
                    survey: { enabled: false },
                },
                token: "random_token",
            },
            expect.anything()
        );
    });
});