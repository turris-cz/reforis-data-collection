#  Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from pathlib import Path
from http import HTTPStatus

from flask import Blueprint, current_app, jsonify, request
from flask_babel import gettext as _

from reforis.foris_controller_api.utils import validate_json, APIError

# pylint: disable=invalid-name
blueprint = Blueprint(
    'DataCollection',
    __name__,
    url_prefix='/data-collection/api',
)

BASE_DIR = Path(__file__).parent

# pylint: disable=invalid-name
data_collection = {
    'blueprint': blueprint,
    # Define {python_module_name}/js/app.min.js
    # See https://gitlab.labs.nic.cz/turris/reforis/reforis-distutils/blob/master/reforis_distutils/__init__.py#L11
    'js_app_path': 'reforis_data_collection/js/app.min.js',
    'translations_path': BASE_DIR / 'translations',
}


@blueprint.route('/settings', methods=['GET'])
def get_settings():
    return jsonify(current_app.backend.perform('sentinel', 'get_settings'))


@blueprint.route('/settings', methods=['POST'])
def post_settings():
    validate_json(request.json, {'eula': int})

    response = current_app.backend.perform('sentinel', 'update_settings', request.json)
    if response.get('result') is not True:
        raise APIError(_('Cannot update Sentinel settings'), HTTPStatus.INTERNAL_SERVER_ERROR)

    return jsonify(response), HTTPStatus.NO_CONTENT


@blueprint.route('/eula', methods=['GET'])
def get_eula():
    return jsonify(current_app.backend.perform('sentinel', 'get_eula'))


@blueprint.route('/state', methods=['GET'])
def get_state():
    """ Get sentinel components state """
    return jsonify(current_app.backend.perform('sentinel', 'get_state'))
