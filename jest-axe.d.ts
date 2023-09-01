// Types extracted from https://www.npmjs.com/package/@types/jest-axe
// because `jest-axe` depends on `@types/jest`, which we don't want
// because we use `@jest/globals`

declare module 'jest-axe' {
  import type { AxeResults, ImpactValue, Result, RunOptions, Spec } from 'axe-core';

  export type JestAxeConfigureOptions = {
    globalOptions?: Spec | undefined;
    impactLevels?: ImpactValue[];
  } & RunOptions

  /**
   * Version of the aXe verifier with defaults set.
   *
   * @remarks You can still pass additional options to this new instance;
   *          they will be merged with the defaults.
   */
  export const axe: JestAxe;

  /**
   * Runs aXe on HTML.
   *
   * @param html   Raw HTML string to verify with aXe.
   * @param options   Options to run aXe.
   * @returns Promise for the results of running aXe.
   */
  export type JestAxe = (html: Element | string, options?: RunOptions) => Promise<AxeResults>;

  /**
   * Creates a new aXe verifier function.
   *
   * @param options   Options to run aXe.
   * @returns New aXe verifier function.
   */
  export function configureAxe(options?: JestAxeConfigureOptions): JestAxe;

  /**
   * Results from asserting whether aXe verification passed.
   */
  export type AssertionsResult = {
    /**
     * Actual checked aXe verification results.
     */
    actual: Result[];

    /**
     * @returns Message from the Jest assertion.
     */
    message(): string;

    /**
     * Whether the assertion passed.
     */
    pass: boolean;
  }

  /**
   * Asserts an aXe-verified result has no violations.
   *
   * @param results   aXe verification result, if not running via expect().
   * @returns Jest expectations for the aXe result.
   */
  export type IToHaveNoViolations = (results?: Partial<AxeResults>) => AssertionsResult;

  export const toHaveNoViolations: {
    toHaveNoViolations: IToHaveNoViolations;
  };
}
