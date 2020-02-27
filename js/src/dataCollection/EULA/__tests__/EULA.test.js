/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";

import diffSnapshot from "snapshot-diff";
import {render, fireEvent, wait, waitForElement, queryAllByText} from "foris/testUtils/customTestRender";

import EULA from '../EULA';


describe("<DataCollection />", () => {
    let getByText;
    let getByLabelText;
    let container;
    let asFragment;

    beforeEach(async () => {
        ({getByText, getByLabelText, container, asFragment} = render(<>
            <EULA/>
            <div id="modal-container"/>
        </>));
        await waitForElement(() => getByText("License Agreement"));
    });

    it("Should request GET setting and GET eula.", async () => {
        expect(mockAxios.get).toBeCalledWith("/reforis/data-collection/api/settings", expect.anything());
        mockAxios.mockResponse({data: {eula: 0, token: "random_token"}});
        await wait(() => {
            expect(mockAxios.get).toBeCalledWith("/reforis/data-collection/api/eula", expect.anything());
        });
    });

    it("Should render form.", async () => {
        mockAxios.mockResponse({data: {eula: 0, token: "random_token"}});
        await wait(() => {
            expect(mockAxios.get).toBeCalledWith("/reforis/data-collection/api/eula", expect.anything());
        });
        mockAxios.mockResponse({data: {version: 1, text: "eula text"}});
        await waitForElement(() => getByLabelText(/I accept/));

        getByLabelText(/I do not accept/);
        getByText("Save");
        expect(container).toMatchSnapshot();
    });

    it("Should toggle modal.", async () => {
        mockAxios.mockResponse({data: {eula: 0, token: "random_token"}});
        await wait(() => {
            expect(mockAxios.get).toBeCalledWith("/reforis/data-collection/api/eula", expect.anything());
        });
        mockAxios.mockResponse({data: {version: 1, text: "eula text"}});
        await waitForElement(() => getByText("eula text"));
        const beforeModalToggle = asFragment();

        fireEvent.click(queryAllByText(container,"Terms of Participation in Turris Project (Data Collection)")[0]);

        expect(diffSnapshot(beforeModalToggle, asFragment())).toMatchSnapshot();
    });
});

