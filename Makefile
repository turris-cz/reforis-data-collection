#  Copyright (C) 2020-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

PROJECT="reForis Sentinel" 
# Retrieve version from pyproject.toml 
VERSION= $(shell sed -En "s/.*version = ['\"](.+)['\"].*/\1/p" pyproject.toml)
COPYRIGHT_HOLDER="CZ.NIC, z.s.p.o. (https://www.nic.cz/)"
MSGID_BUGS_ADDRESS="tech.support@turris.cz"

VENV_NAME?=venv
VENV_BIN=$(shell pwd)/$(VENV_NAME)/bin

PYTHON=python3
PIP_EXTRA_INDEX_URL=https://gitlab.nic.cz/api/v4/projects/1066/packages/pypi/simple

JS_DIR=./js

LANGS = cs da de el en fi fo fr hr hu it ja ko lt nb_NO nl pl ro ru sk sv

.PHONY: all
all:
	@echo "make prepare-dev"
	@echo "    Create python virtual environment and install dependencies."
	@echo "make install"
	@echo "    Install package in your system (for running on router)."
	@echo "make watch-js"
	@echo "    Compile JS in watch mode."
	@echo "make build-js"
	@echo "    Compile JS."
	@echo "make lint"
	@echo "    Run lint on project."
	@echo "make test"
	@echo "    Run tests on project."
	@echo "make create-messages"
	@echo "    Create locale messages (.pot)."
	@echo "make update-messages"
	@echo "    Update locale messages from .pot file."
	@echo "make compile-messages"
	@echo "    Compile locale messager."
	@echo "make clean"
	@echo "    Remove python artifacts and virtualenv."


# Preparation

.PHONY: prepare-dev
prepare-dev:
	which npm || curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
	which npm || sudo apt-get install -y nodejs
	cd $(JS_DIR); npm install

	which $(PYTHON) || sudo apt-get install -y $(PYTHON) $(PYTHON)-pip
	which virtualenv || sudo $(PYTHON) -m pip install virtualenv
	make venv

.PHONY: venv
venv: $(VENV_NAME)/bin/activate
$(VENV_NAME)/bin/activate: pyproject.toml
	test -d $(VENV_NAME) || $(PYTHON) -m virtualenv -p $(PYTHON) $(VENV_NAME)
	# upgrade pip to latest releases
	$(VENV_BIN)/$(PYTHON) -m pip install --upgrade pip
	$(VENV_BIN)/$(PYTHON) -m pip install --index-url $(PIP_EXTRA_INDEX_URL) -e .[devel]
	touch $(VENV_NAME)/bin/activate


# Installation

.PHONY: install
install:
	opkg update
	opkg install foris-controller-sentinel-module
	REFORIS_NO_JS_BUILD=1 $(PYTHON) -m pip install --index-url $(PIP_EXTRA_INDEX_URL) -e .
	ln -sf /tmp/reforis-sentinel/reforis_static/reforis_sentinel /tmp/reforis/reforis_static/
	/etc/init.d/lighttpd restart

.PHONY: install-js
install-js: js/package.json
	cd $(JS_DIR); npm install --save-dev

.PHONY: install-local-reforis
install-local-reforis:
	$(VENV_BIN)/$(PYTHON) -m pip install -e ../reforis


# JavaScript

.PHONY: build-js
build-js:
	cd $(JS_DIR); npm run-script build

.PHONY: watch-js
watch-js:
	cd $(JS_DIR); npm run-script watch


# Linting

.PHONY: lint
lint: lint-js lint-web

.PHONY: lint-js
lint-js:
	cd $(JS_DIR); npm run lint

.PHONY: lint-js-fix
lint-js-fix:
	cd $(JS_DIR); npm run lint:fix

.PHONY: lint-web
lint-web: venv
	$(VENV_BIN)/$(PYTHON) -m ruff check reforis_sentinel


# Testing

.PHONY: test
test: test-js test-web

.PHONY: test-js
test-js:
	cd $(JS_DIR); npm test

.PHONY: test-js-watch
test-js-watch:
	cd $(JS_DIR); npm test -- --watch

.PHONY: test-js-update-snapshots
test-js-update-snapshots:
	cd $(JS_DIR); npm test -- -u

.PHONY: test-web
test-web: venv
	$(VENV_BIN)/$(PYTHON) -m pytest -vv tests


# Translations

.PHONY: init-langs
init-langs: create-messages
	for lang in $(LANGS); do \
		$(VENV_BIN)/pybabel init \
		-i reforis_sentinel/translations/messages.pot \
		-d reforis_sentinel/translations/ -l $$lang \
	; done

.PHONY: create-messages
create-messages: venv
	$(VENV_BIN)/pybabel extract -F babel.cfg -o ./reforis_sentinel/translations/messages.pot . --project=$(PROJECT) --version=$(VERSION) --copyright-holder=$(COPYRIGHT_HOLDER) --msgid-bugs-address=$(MSGID_BUGS_ADDRESS)

.PHONY: update-messages
update-messages: venv
	$(VENV_BIN)/pybabel update -i ./reforis_sentinel/translations/messages.pot -d ./reforis_sentinel/translations --update-header-comment

.PHONY: compile-messages
compile-messages: venv install-js
	$(VENV_BIN)/pybabel compile -f -d ./reforis_sentinel/translations


# Other

.PHONY: clean
clean:
	find . -name '*.pyc' -exec rm -f {} +
	rm -rf $(VENV_NAME) *.eggs *.egg-info dist build docs/_build .cache
	rm -rf $(JS_DIR)/node_modules/ reforis_static/reforis_sentinel/js/app.min.js
	$(PYTHON) -m pip uninstall -y reforis_sentinel
