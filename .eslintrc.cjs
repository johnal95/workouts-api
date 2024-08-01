/** @type {import("eslint").Linter.Config} */
module.exports = {
    env: { es2022: true, node: true },
    ignorePatterns: [".eslintrc.cjs", "jest.config.ts"],
    overrides: [
        /**
         * TYPESCRIPT CODE
         */
        {
            files: ["{src,test}/**/*.ts"],
            parser: "@typescript-eslint/parser",
            parserOptions: { project: "tsconfig.eslint.json" },
            extends: [
                "eslint:recommended",
                "plugin:import/recommended",
                "plugin:import/typescript",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:@typescript-eslint/strict",
            ],
            plugins: ["@typescript-eslint"],
            rules: {
                "@typescript-eslint/explicit-module-boundary-types": "error",
                "@typescript-eslint/no-explicit-any": "error",
                "@typescript-eslint/no-extraneous-class": "off",
                "@typescript-eslint/no-non-null-assertion": "error",
                "@typescript-eslint/no-unused-vars": "off", // enforced by TypeScript
                "import/exports-last": "error",
                "import/imports-first": "error",
                "import/no-cycle": "error",
                "import/no-default-export": "error",
                "import/no-extraneous-dependencies": "error",
                "no-console": "error",
                "prefer-const": "error",
            },
        },
        /**
         * TYPESCRIPT DTO FILES
         */
        {
            files: ["src/**/*.dto.ts"],
            rules: {
                "@typescript-eslint/no-empty-function": "off",
            },
        },
        /**
         * TYPESCRIPT TEST CODE
         */
        {
            files: ["test/**/*.ts"],
            rules: {
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-unsafe-argument": "off",
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
            },
        },
    ],
};
