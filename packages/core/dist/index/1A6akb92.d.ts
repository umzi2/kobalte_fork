import { Setter } from "solid-js";
//#region src/primitives/create-register-id/create-register-id.d.ts
/**
 * Create a function that call the setter with an id and return a function to reset it.
 */
declare function createRegisterId(setter: Setter<string | undefined>): (id: string) => () => undefined;
//#endregion
export { createRegisterId as t };