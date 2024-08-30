#!/bin/bash

# Set variables
PACKAGE_NAME="infinyon-http-source-0.3.8"
PACKAGE_VERSION="0.3.8"
PACKAGE_IPKG="${PACKAGE_NAME}.ipkg"
PACKAGE_URL="infinyon/http-source@${PACKAGE_VERSION}"
HTTP_SOURCES_DIR="."

# Function to download the package if it doesn't exist
download_package() {
  if [ ! -f "${HTTP_SOURCES_DIR}/${PACKAGE_IPKG}" ]; then
    echo "Package ${PACKAGE_IPKG} not found. Downloading..."
    cdk hub download ${PACKAGE_URL} -o ${HTTP_SOURCES_DIR}
  else
    echo "Package ${PACKAGE_IPKG} already exists."
  fi
}

# Function to deploy configurations
deploy_configurations() {
  for file in ${HTTP_SOURCES_DIR}/*.yml; do
    if [ -f "$file" ] && [ "$(basename "$file")" != "example-source.yml" ]; then
      echo "Deploying ${file}..."
      echo "Command: cdk deploy start --ipkg ${PACKAGE_IPKG} -c ${file}"
      cdk deploy start --ipkg ${PACKAGE_IPKG} -c ${file}
    else
      echo "Skipping ${file}."
    fi
  done
}



# Main script execution
download_package
deploy_configurations

echo "Script execution completed."
