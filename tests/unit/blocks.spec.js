import Vue from 'vue';
import { shallowMount } from '@vue/test-utils'
import Node from '@/components/Node.vue'
import Block from '@/components/Block.vue'
import store from '../../src/store'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('<Block />', () => {
  const defaultProps = {};

  //mocks fetch API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ el: { url: 'https://thawing-springs-53971.herokuapp.com' }, node_name: 'Test Name' }),
    })
  );

  const render = (props = {node:{
      url: "",
      online: true,
      name: "sample-node",
      loading: false,
      blocks:[{attributes:{index:0,data:"simple-text"}}],
    }}) => shallowMount(Node, {
    store,
    comments:{Block},
    propsData: {
      ...defaultProps,
      ...props
    }
  });
  
  it('renders', () => {
    const wrapper = render();
    expect(wrapper.find('.expansion-container').exists()).toBeTruthy;
  });

  it('match the snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders nodes', () => {
    const wrapper = render();
    expect(wrapper.findComponent(Node).exists()).toBeTruthy;
  });
});