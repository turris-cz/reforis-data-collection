/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {render, fireEvent, act, waitForElement, queryAllByText} from "foris/testUtils/customTestRender";

import EULAForm from '../EULAForm';


describe("<DataCollection />", () => {
    let getByText;
    let getByLabelText;
    let container;
    let asFragment;
    const onModalToggle = jest.fn();
    const onChange = jest.fn();

    beforeEach(async () => {
        ({getByText, getByLabelText, container, asFragment} = render(
            <EULAForm
                setFormValue={() => onChange}
                onModalToggle={onModalToggle}
                formData={{eula: 0}}
            />
        ));
        await waitForElement(() => getByLabelText(/I do not accept/));
    });

    it("Should render RadioSet.", async () => {
        getByLabelText(/I accept/);
        getByLabelText(/I do not accept/);
    });

    it("Should toggle modal on EULA click.", () => {
        expect(onModalToggle).toHaveBeenCalledTimes(0);
        const radios = queryAllByText(container, /Terms of Participation in Turris Project/);
        fireEvent.click(radios[0]);
        expect(onModalToggle).toHaveBeenCalledTimes(1);
        fireEvent.click(radios[1]);
        expect(onModalToggle).toHaveBeenCalledTimes(2);
    });

    it("Should not toggle modal on click outside EULA.", () => {
        expect(onChange).toHaveBeenCalledTimes(0);

        act(() => {
            fireEvent.click(getByLabelText(/I accept/));
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onModalToggle).toHaveBeenCalledTimes(0);
    });
});

