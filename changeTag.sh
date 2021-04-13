#! /bin/bash

sed "s/tagVersion/$1/g" deployment-frontend.yaml > deployment-frontend.k8s.yaml