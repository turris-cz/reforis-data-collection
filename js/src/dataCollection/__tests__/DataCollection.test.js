/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {
    render,
    wait,
    waitForElement,
    fireEvent,
} from "foris/testUtils/customTestRender";

import DataCollection from "../DataCollection";
import mockAxios from "jest-mock-axios";
import diffSnapshot from "snapshot-diff";
import { EULAFixture } from "./__fixtures__/EULAFixture";

describe("<DataCollection />", () => {
    let asFragment;
    let firstRender;
    let getByText;
    let getByLabelText;
    let queryAllByText;

    beforeEach(async () => {
        const renderRes = render(
            <>
                <DataCollection />
                <div id="modal-container" />
            </>
        );
        mockAxios.mockResponse({ data: EULAFixture });
        getByText = renderRes.getByText;
        getByLabelText = renderRes.getByLabelText;
        queryAllByText = renderRes.queryAllByText;
        asFragment = renderRes.asFragment;

        await wait(() => getByText("License Agreement"));
        firstRender = renderRes.asFragment();
    });

    it("Should render form.", async () => {
        expect(mockAxios.get).toBeCalledWith(
            "/reforis/data-collection/api/eula",
            expect.anything()
        );
        mockAxios.mockResponse({ data: { version: 1, text: "eula text" } });
        await wait(() => getByLabelText(/I accept/));
        getByLabelText(/I do not accept/);
        getByText("Save");

        expect(firstRender).toMatchSnapshot();
    });

    it("Should toggle modal.", async () => {
        expect(mockAxios.get).toBeCalledWith(
            "/reforis/data-collection/api/eula",
            expect.anything()
        );

        mockAxios.mockResponse({ data: { version: 1, text: "eula text" } });
        await waitForElement(() => getByText("eula text"));
        const beforeModalToggle = firstRender;

        fireEvent.click(
            queryAllByText(
                "Terms of Participation in Turris Project (Data Collection)"
            )[0]
        );

        expect(diffSnapshot(beforeModalToggle, asFragment())).toMatchSnapshot();
    });

    it("Snapshot of Sentinel options", () => {
        fireEvent.click(getByLabelText(/I accept/));
        getByText("Sentinel Components");
        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });

    it("Success post request", () => {
        fireEvent.click(getByLabelText(/I accept/));

        fireEvent.click(getByText("Enable Firewall Logs"));

        fireEvent.click(getByText("Save"));
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/data-collection/api/settings",
            {
                eula: 1,
                modules: {
                    minipot: {
                        enabled: true,
                        protocols: {
                            ftp: true,
                            http: true,
                            smtp: true,
                            telnet: true,
                        },
                    },
                    nikola: { enabled: false },
                    survey: { enabled: true },
                },
                token: "random_token",
            },
            expect.anything()
        );
    });
});
