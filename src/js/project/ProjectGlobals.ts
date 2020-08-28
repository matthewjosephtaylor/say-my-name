export type ProjectPackage = {
  name: string;
  version: string;
  description: string;
};

/**
 * @see webpack.config.js
 */
declare const PROJECT_PACKAGE: ProjectPackage;
export function getProjectPackage(): ProjectPackage {
  return PROJECT_PACKAGE;
}

export function getProjectVersion(): string {
  return getProjectPackage().version;
}

/**
 * @see webpack.config.js
 */
declare const BUILD_TIME_MILLIS: string;
export function getBuildTimeMills(): number {
  return Number(BUILD_TIME_MILLIS);
}

export function getBuildTimeIso(): string {
  const date = new Date(getBuildTimeMills());
  return date.toISOString();
}
