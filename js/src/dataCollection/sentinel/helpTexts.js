/*
 * Copyright (C) 2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

const HELP_TEXTS = {
    firewallLogs: _(`Firewall Logs are logs gathered from iptables firewall. If \
enabled, Sentinel use them to monitor packets coming from outside network and \
trying to connect to potentially vulnerable local services. These techniques, \
also known as "port scans" usually try to detect whether specific ports are \
opened on local device. If enabled, Sentinel Firewall Logs gather information \
about origin of such malicious packets and about ports they try to scan on \
local device.`),
    minipots: _(`The main purpose of the Sentinel Minipot is to collect \
authentication information from the login attempts. It is possible to \
emulate some of the often attacked services - Telnet, HTTP, FTP, and SMTP. The \
goal is to catch the attacker red-handed when they think they attack a real \
service.`),
    survey: _(`Since our team has only limited manpower, we try to primarily \
focus on subjects that really matter. The Turris survey collects information \
about installed packages, used languages, and operating system versions. Based \
on this we are able to identify widely used packages, features and provide \
special support.`),
};

export default HELP_TEXTS;
