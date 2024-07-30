#!/bin/bash
# AsyncAPI tooling is a fragile snowflake :-( Couldn't get it to work on macOS.
# The `ag` tool seems to require very specific node versions and often simply
# fails with "Something went wrong" without any further information...
# And don't get me started with external references and bundling it back into a
# single file since most tools can't handle split yaml files as OpenAPI does...
#
# If you run into issues, use the Docker version!

set -e

command -v ag >/dev/null 2>&1 || {
  echo >&2 "AsyncAPI generator not installed. Aborting.";
  echo >&2 "Install with: 'sudo npm install -g @asyncapi/generator'  (no sudo required on macOS)";
  exit 1;
}

readonly OUT_DIR=html
mkdir -p $OUT_DIR
ag UCR-integration-asyncapi.yaml @asyncapi/html-template --force-write -o $OUT_DIR
