/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { RadioSet } from "foris";
import React from "react";

export default function EULAForm({
    formData, setFormValue, formErrors, onModalToggle, ...props
}) {
    return (
        <>
            <RadioSet
                choices={getEULAChoices(onModalToggle)}
                name={_("Agreement")}
                value={formData.eula.toString()}
                onChange={
                    setFormValue((value) => ({ eula: { $set: value } }))
                }
                {...props}
            />
        </>
    );
}

function getEULAChoices(onModalToggle) {
    function onClickHandler(e) {
        // `target` is the element the click was on (the div we hooked or an element
        // with in it), `currentTarget` is the div we hooked the event on
        const el = e.target.closest("a");
        if (el && e.currentTarget.contains(el)) {
            e.preventDefault();
            onModalToggle();
        }
    }

    return [
        {
            value: "0",
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            label: <div
                onClick={onClickHandler}
                dangerouslySetInnerHTML={{
                    __html:
                    _("I do not accept the <a href=\"#\">Terms of Participation in Turris Project (Data Collection)</a>."),
                }}
            />,
        },
        {
            value: "1",
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            label: <div
                onClick={onClickHandler}
                dangerouslySetInnerHTML={{
                    __html:
                    _("I accept the <a href=\"#\">Terms of Participation in Turris Project (Data Collection)</a>."),
                }}
            />,
        },
    ];
}
