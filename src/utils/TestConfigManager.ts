import * as fs from 'fs';
import * as path from 'path';

export interface TestSuite {
    name: string;
    testFiles: string[];
    enabled: boolean;
}

export interface Repository {
    name: string;
    url: string;
    branches: string[];
    testSuites: TestSuite[];
}

export interface TestConfig {
    repositories: Repository[];
}

export class TestConfigManager {
    private config: TestConfig;

    constructor(configPath: string = path.join(__dirname, '../test-data/test-config.json')) {
        this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    public getRepository(name: string): Repository | undefined {
        return this.config.repositories.find(repo => repo.name === name);
    }

    public getTestSuite(repoName: string, suiteName: string): TestSuite | undefined {
        const repo = this.getRepository(repoName);
        return repo?.testSuites.find(suite => suite.name === suiteName);
    }

    public validateBranch(repoName: string, branch: string): boolean {
        const repo = this.getRepository(repoName);
        return repo?.branches.includes(branch) || false;
    }

    public getTestFiles(repoName: string, suiteName?: string): string[] {
        const repo = this.getRepository(repoName);
        if (!repo) return [];

        if (suiteName) {
            const suite = this.getTestSuite(repoName, suiteName);
            return suite?.enabled ? suite.testFiles : [];
        }

        return repo.testSuites
            .filter(suite => suite.enabled)
            .flatMap(suite => suite.testFiles);
    }
}
