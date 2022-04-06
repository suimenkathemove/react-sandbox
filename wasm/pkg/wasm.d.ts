/* tslint:disable */
/* eslint-disable */
/**
* @param {string} name
*/
export function greet(name: string): void;
/**
*/
export enum Cell {
  Dead,
  Alive,
}
/**
*/
export class List {
  free(): void;
/**
* @returns {any}
*/
  static show(): any;
/**
* @param {any} val
*/
  static create(val: any): void;
}
/**
*/
export class Todo {
  free(): void;
/**
* @param {string} id
* @param {string} text
* @returns {Todo}
*/
  static new(id: string, text: string): Todo;
/**
* @returns {string}
*/
  id: string;
/**
* @returns {string}
*/
  text: string;
}
/**
*/
export class Universe {
  free(): void;
/**
*/
  tick(): void;
/**
* @returns {Universe}
*/
  static new(): Universe;
/**
* @returns {string}
*/
  render(): string;
}
