import {Component} from 'vue';

export type ComponentTest = (component: Omit<Component, 'props'>, ...args: unknown[]) => void;
