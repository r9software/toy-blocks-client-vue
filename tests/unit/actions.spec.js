import { actions } from '../../src/store/actions'

describe('Store Actions', () => {
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ el: { url: 'https://thawing-springs-53971.herokuapp.com' }, node_name: 'Test Name', data:[{attributes:{index:0,data:"simple-text"}}]}),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it('getAllNodes With Success', async () => {
    const commit = jest.fn();
    const block = {
      nodes: {
        list: [ 
          {
            url: 'https://thawing-springs-53971.herokuapp.com',
            online: false,
            name: 'Node 1',
            loading: false,
          },
        ]
      }
    };
    const param = block.nodes.list;
    await actions.getAllNodes({ commit }, param);
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenCalledWith('checkNodeStatusStart', param[0]);
    expect(commit).toHaveBeenCalledWith('checkNodeStatusSuccess', { el: param[0], name: 'Test Name' });
  });

  it('getAllNodes With failure', async () => {
    const commit = jest.fn();
    fetch.mockImplementationOnce(() => Promise.reject());
    const block = {
      nodes: {
        list: [ 
          {
            url: 'http://localhost:3002',
            online: false,
            name: 'Node 4',
            loading: false
          },
        ]
      }
    };
    const param = block.nodes.list;
    await actions.getAllNodes({ commit }, param);
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenCalledWith('checkNodeStatusStart', param[0]);
    expect(commit).toHaveBeenCalledWith('checkNodeStatusFailure', param[0]);
  });


  it('getAllBlocks With Success', async () => {
    const commit = jest.fn();
    const block = {
      nodes: {
        list: [
          {
            url: 'https://thawing-springs-53971.herokuapp.com',
            online: false,
            name: 'Node 1',
            loading: false,
          },
        ]
      }
    };
    const param = block.nodes.list[0];
    await actions.getAllBlocksForNode({ commit }, param);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('nodeBlocksResponseSuccess', { el: param, blocks:[{attributes:{index:0,data:"simple-text"}}] });
  });

  it('getAllBlocks With failure', async () => {
    const commit = jest.fn();
    fetch.mockImplementationOnce(() => Promise.reject());
    const block = {
      nodes: {
        list: [
          {
            url: 'http://localhost:3002',
            online: false,
            name: 'Node 4',
            loading: false
          },
        ]
      }
    };
    const param = block.nodes.list[0];
    await actions.getAllBlocksForNode({ commit }, param);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('nodeBlocksResponseFailure', {el:param});
  });

});