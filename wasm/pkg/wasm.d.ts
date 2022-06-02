/* tslint:disable */
/* eslint-disable */
/**
* @param {any} val
* @returns {any}
*/
export function build_tree(val: any): any;
/**
* @param {any} val
* @returns {any}
*/
export function flatten_tree(val: any): any;
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
/**
* @param {any} val
*/
  static update(val: any): void;
/**
* @param {any} id
*/
  static delete(id: any): void;
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
