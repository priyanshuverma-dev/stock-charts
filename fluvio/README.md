> Out dated readme!

# Http Sources for Fluvio

This directory contains configuration files for HTTP sources used with Fluvio.

## Adding Configuration Files

1. **Add Your `.yml` File**:

   - Add your `.yml` file(s) to this directory. Each file should contain the configuration for a specific HTTP source.
   - Ensure that the file name follows a convention that clearly indicates its purpose, such as `[Stock NASDAQ].yml`.

2. **Example Configuration**:
   - See the `example-source.yml` file in this directory for a template and more information about how to structure your configuration file.
   - Make sure to customize the example to fit your specific use case.

## Deploying and Creating Topics

To deploy the configurations and create topics based on the `.yml` files, use the provided script:

1. **Ensure Prerequisites**:

   - Make sure you have the Fluvio CLI installed.

2. **Run the Script**:

   - The script `deploy.sh` is located in this directory.
   - Make sure the script has execute permissions:
     ```bash
     chmod +x deploy.sh
     ```
   - Execute the script:
     ```bash
     ./deploy.sh
     ```

   The script performs the following actions:

   - Downloads the necessary package if it’s not already present.
   - Deploys each `.yml` file using `cdk deploy`.
   - Creates Fluvio topics based on the `topic` field in each `.yml` file.

## Notes

- **Package Download**: The script downloads the `infinyon-http-source-0.3.8` package if it is not already in the directory. Ensure your environment can access the required package.
- **Configuration**: Ensure your `.yml` files are correctly configured according to the specifications provided in `example-source.yml`.
