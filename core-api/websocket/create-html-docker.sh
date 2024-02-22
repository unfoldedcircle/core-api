#!/bin/bash

readonly OUT_DIR=${PWD}/html

mkdir -p "$OUT_DIR"
docker run --rm -it \
  -v "${OUT_DIR}":/app/example \
  -v "${PWD}/UCR2-asyncapi.yaml":/app/asyncapi.yaml \
  asyncapi/generator:1.9.2 asyncapi.yaml @asyncapi/html-template@0.25 --force-write -o example

