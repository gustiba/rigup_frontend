#! /bin/bash

sed "s/tagVersion/$1/g" deployment-frontend.yml > deployment-frontend.k8s.yaml