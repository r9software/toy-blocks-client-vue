export const mutations = {
  checkNodeStatusStart(state, { url }) {
    let list = state.nodes.list;
    const index = state.nodes.list.findIndex(t => t.url === url);
    if (index >= 0) {
      list = [
        ...state.nodes.list.slice(0, index),
        {
          ...state.nodes.list[index],
          loading: true
        },
        ...state.nodes.list.slice(index + 1)
      ];
    }
    state.nodes = {
      list: [
        ...list,
      ]
    }
  },

  checkNodeStatusSuccess(state, { el : { url }, name }) {
    let list = state.nodes.list;
    const index = state.nodes.list.findIndex(t => t.url === url);
    if (index >= 0) {
      list = [
        ...state.nodes.list.slice(0, index),
        {
          ...state.nodes.list[index],
          name: name,
          online: true,
          loading: false,
          blocks:[],
        },
        ...state.nodes.list.slice(index + 1)
      ];
    }

    state.nodes = {
      list: [
        ...list,
      ]
    }
  },
  nodeBlocksResponseSuccess(state,{ el : { url }, blocks }) {
    let list = state.nodes.list;
    const index = state.nodes.list.findIndex(t => t.url === url);
    if (index >= 0) {
      list = [
        ...state.nodes.list.slice(0, index),
        {
          ...state.nodes.list[index],
          blocks:blocks
        },
        ...state.nodes.list.slice(index + 1)
      ];
    }

    state.nodes = {
      list: [
        ...list,
      ]
    }
  },
  nodeBlocksResponseFailure(state, { el : { url } }) {
    let list = state.nodes.list;
    const index = state.nodes.list.findIndex(t => t.url === url);
    if (index >= 0) {
      list = [
        ...state.nodes.list.slice(0, index),
        {
          ...state.nodes.list[index],
          blocks:[],
        },
        ...state.nodes.list.slice(index + 1)
      ];
    }

    state.nodes = {
      list: [
        ...list,
      ]
    }
  },
  checkNodeStatusFailure(state, { url }) {
    let list = state.nodes.list;
    const index = state.nodes.list.findIndex(t => t.url === url);
    if (index >= 0) {
      list = [
        ...state.nodes.list.slice(0, index),
        {
          ...state.nodes.list[index],
          online: false,
          loading: false,
          blocks:[],
        },
        ...state.nodes.list.slice(index + 1)
      ];
    }

    state.nodes = {
      list: [
        ...list,
      ]
    }
  },
}