/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import { RadioSet } from "foris";

EULAForm.propTypes = {
    formData: PropTypes.shape({
        eula: PropTypes.number.isRequired,
    }),
    setFormValue: PropTypes.func,
    onModalToggle: PropTypes.func,
    disabled: PropTypes.bool,
};

export default function EULAForm({
    formData,
    setFormValue,
    onModalToggle,
    disabled,
}) {
    return (
        <>
            <h2>{_("Terms of Participation")}</h2>
            <p>
                {_(
                    "Your consent with the Terms of Participation allows us to analyze potential threats detected on your router and therefore to build a dynamic firewall."
                )}
            </p>
            <RadioSet
                choices={getEULAChoices(onModalToggle)}
                name={_("Agreement")}
                value={formData.eula.toString()}
                onChange={setFormValue((value) => ({
                    eula: { $set: parseInt(value) },
                }))}
                disabled={disabled}
            />
        </>
    );
}

// Hack to make link with translations clickable in order to toggle modal.
function getEULAChoices(onModalToggle) {
    function onClickHandler(e) {
        const el = e.target.closest("a");
        if (el && e.currentTarget.contains(el)) {
            e.preventDefault();
            onModalToggle();
        }
    }

    return [
        {
            value: "1",
            label: (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                <div
                    onClick={onClickHandler}
                    dangerouslySetInnerHTML={{
                        __html: _(
                            "I accept the <a href='#'>Terms of Participation in Turris Project (Data Collection)</a>."
                        ),
                    }}
                />
            ),
        },
        {
            value: "0",
            label: (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                <div
                    onClick={onClickHandler}
                    dangerouslySetInnerHTML={{
                        __html: _(
                            "I do not accept the <a href='#'>Terms of Participation in Turris Project (Data Collection)</a>."
                        ),
                    }}
                />
            ),
        },
    ];
}
