/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render,wait } from "foris/testUtils/customTestRender";

import DataCollection from '../DataCollection';


describe("<DataCollection />", () => {
    it("should render component", () => {
        const { getByText } = render(<DataCollection />);
        wait(()=>getByText("Data Collection"));
    });
});
