import {expect, it} from 'vitest';
import {Component} from 'vue';
import {mount} from './mount';
import {runCommonComponentTests} from './runCommonComponentTests';

export const createPdkIconTest = (name: string, component: Omit<Component, 'props'>): void => {
  const defaultProps = {
    props: {
      icon: 'truck',
    },
  };

  runCommonComponentTests(component, defaultProps);

  it('has icon prop', () => {
    const wrapper = mount(component, defaultProps);

    expect(wrapper.props().icon).toBe('truck');
  });
};
