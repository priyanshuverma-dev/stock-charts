#!/bin/bash

# Log in to Fluvio
fluvio cloud login --email $FLUVIO_CLOUD_EMAIL --password $FLUVIO_CLOUD_PASSWORD

fluvio cloud cluster sync


# Start the application
exec bun run dev
