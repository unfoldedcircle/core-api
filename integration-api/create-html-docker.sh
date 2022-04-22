#!/bin/bash

readonly OUT_DIR=${PWD}/html

mkdir -p $OUT_DIR
docker run --rm -it \
  -v ${OUT_DIR}:/app/example \
  -v ${PWD}/asyncapi.yaml:/app/asyncapi.yaml \
  asyncapi/generator:1.9.2 asyncapi.yaml @asyncapi/html-template --force-write -o example
