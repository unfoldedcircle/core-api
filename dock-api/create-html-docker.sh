#!/bin/bash

readonly OUT_DIR=${PWD}/html

mkdir -p "$OUT_DIR"
docker run --rm -it \
  -v "${OUT_DIR}":/app/example \
  -v "${PWD}/UCD2-asyncapi.yaml":/app/asyncapi.yaml \
  asyncapi/generator:1.9.14 asyncapi.yaml @asyncapi/html-template@0.28 --force-write -o example
