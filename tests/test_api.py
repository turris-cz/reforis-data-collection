#  Copyright (C) 2020-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
from reforis.test_utils import mock_backend_response


@mock_backend_response({"sentinel": {"get_settings": {"eula": 0, "token": "some1234token"}}})
def test_get_settings(client):
    response = client.get("/sentinel/api/settings")
    assert response.status_code == HTTPStatus.OK
    assert response.json["eula"] == 0
    assert response.json["token"] == "some1234token"


@mock_backend_response({"sentinel": {"update_settings": {"result": True}}})
def test_post_settings_invalid_json(client):
    response = client.post("/sentinel/api/settings", json=False)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == "Invalid JSON"


@mock_backend_response({"sentinel": {"update_settings": {"result": True}}})
def test_post_settings(client):
    response = client.post("/sentinel/api/settings", json={"eula": 0, "token": "some1234token"})
    assert response.status_code == HTTPStatus.NO_CONTENT


@mock_backend_response({"sentinel": {"update_settings": {"result": False}}})
def test_post_settings_bad_foris_controller_response(client):
    response = client.post("/sentinel/api/settings", json={"eula": 0, "token": "some1234token"})
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR


@mock_backend_response(
    {"sentinel": {"get_state": {"fwlogs": "running", "minipot": "sending", "survey": "disabled", "proxy": "failed"}}}
)
def test_get_state(client):
    response = client.get("/sentinel/api/state")

    assert response.status_code == HTTPStatus.OK
    assert response.json.keys() == {"fwlogs", "minipot", "survey", "proxy"}
    assert response.json["fwlogs"] == "running"
    assert response.json["minipot"] == "sending"
    assert response.json["survey"] == "disabled"
    assert response.json["proxy"] == "failed"
