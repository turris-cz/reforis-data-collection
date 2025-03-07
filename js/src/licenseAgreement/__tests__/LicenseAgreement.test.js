/*
 * Copyright (C) 2020-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
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

import LicenseAgreement from "../LicenseAgreement";
import mockAxios from "jest-mock-axios";
import diffSnapshot from "snapshot-diff";
import { EULAFixture } from "./__fixtures__/EULAFixture";

describe("<LicenseAgreement />", () => {
    let asFragment;
    let firstRender;
    let getByText;
    let getByLabelText;
    let queryAllByText;

    beforeEach(async () => {
        const renderRes = render(
            <>
                <LicenseAgreement />
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
            "/reforis/sentinel/api/eula",
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
            "/reforis/sentinel/api/eula",
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
});
