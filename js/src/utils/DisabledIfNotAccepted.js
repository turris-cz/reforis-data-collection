/*
 * Copyright (C) 2021-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

import DisabledAlert from "./DisabledAlert";

DisabledIfNotAccepted.propTypes = {
    formData: PropTypes.shape({ eula: PropTypes.number }),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default function DisabledIfNotAccepted({
    children,
    formData,
    ...props
}) {
    const isDisabled = formData.eula !== 1;
    const childrenWithFormProps = React.Children.map(children, (child) =>
        React.cloneElement(child, { ...props, formData, disabled: isDisabled })
    );

    if (!isDisabled) return childrenWithFormProps;

    return (
        <>
            <DisabledAlert />
            {childrenWithFormProps}
        </>
    );
}
