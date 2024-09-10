# Contributing to StockViz

First off, thank you for considering contributing to StockViz! It's people like you that make this project great. We welcome any contributions including bug fixes, enhancements, or new features.

## How to Contribute

### Reporting Issues

If you encounter any bugs or have suggestions for improvements, please create an issue on GitHub. When reporting an issue, please include:

- A clear and descriptive title.
- A detailed description of the problem or suggestion.
- Steps to reproduce the issue, if applicable.
- Any relevant code snippets, logs, or screenshots.

### Forking the Repository

1. Fork the repository by clicking the "Fork" button on the top right of the GitHub page.
2. Clone your fork to your local machine:

   ```bash
   git clone https://github.com/yourusername/stock-charts.git
   ```

3. Add the original repository as a remote:

   ```bash
   cd edunotify
   git remote add upstream https://github.com/yourusername/stock-charts.git
   ```
   
## Setup Dev Environment

#### Server

1. **Navigate to the Server Directory**

   ```bash
   cd server
   ```

2. **Install Dependencies**

   ```bash
   bun install
   ```

3. **Run the Server**

   ```bash
   bun dev
   ```

   The server will be available at `http://localhost:5000`.

#### Client

1. **Navigate to the Client Directory**

   ```bash
   cd client
   ```

2. **Create a `.env` File**

   In the `client` directory of the project, create a file named .env with the following content:

   ```env
   AUTH_SECRET="changeMe"
   AUTH_GITHUB_ID="<github-id>"
   AUTH_GITHUB_SECRET="<github-secret>"
   NEXT_PUBLIC_SERVER_URL="http://localhost:8000"
   NEXT_PUBLIC_URL="http://localhost:3000"
   DATABASE_URL="<mongodb>"
   ```

3. **Install Dependencies**

   ```bash
   bun install
   ```

4. **Generate Prisma Schema**

   ```bash
   npx prisma db push
   ```

5. **Run the Development Server**

   ```bash
   bun dev
   ```

   The client application will be available at `http://localhost:3000`.

#### Fluvio

1. **Navigate to the Fluvio Directory**

   ```bash
   cd fluvio
   ```

2. **Install Required Fluvio Package**

   ```bash
   cdk hub download infinyon/http-source@0.3.8
   ```

3. **Create a Topic**

   ```bash
   fluvio topic create stocks-sinker
   ```

4. **Deploy Sinker**

   ```bash
   cdk deploy start --ipkg ./infinyon-http-source-0.3.8.ipkg -c ./sinker.yml
   ```

### Widget Scripts

To see widget open `widget/index.html` in root and change its `div` id with locally created id and
open in browser.

You will find widget scripts in `widget/dist/` to add to your website.
You need to build widget again after any change in `widget` folder by:

```bash
bun run build
```

### Making Changes

1. Create a new branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the new branch.
3. Ensure your code adheres to the project's coding standards.
4. Test your changes thoroughly.

### Submitting Pull Requests

1. Push your changes to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a pull request (PR) from your branch to the `main` branch of the original repository.
3. In your PR description, include:

   - A clear and descriptive title.
   - A detailed description of the changes you made.
   - Any relevant issue numbers (e.g., `Closes #123`).
   - Screenshots or GIFs of the changes, if applicable.

### Code Review

Your pull request will be reviewed by one of the project maintainers. They may ask you to make some changes before merging the PR. Once your changes are approved, your PR will be merged into the main branch.

## Coding Standards

- Follow the existing code style.
- Write clear, concise, and descriptive commit messages.
- Ensure all new and existing tests pass.
- Add tests for your changes where applicable.

## License

By contributing to StockViz, you agree that your contributions will be licensed under the [MIT License](LICENSE).

Thank you for contributing to StockViz!
