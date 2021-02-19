import { mutations } from '../../src/store/mutations'
import initialState from '../../src/store/initialState';

describe('Store Mutations', () => {
  const { 
    checkNodeStatusStart, 
    checkNodeStatusSuccess, 
    checkNodeStatusFailure,
    nodeBlocksResponseFailure,
    nodeBlocksResponseSuccess,
    } = mutations; 

  const initState = initialState();

  it('checkNodeStatusStart', () => {
      checkNodeStatusStart(initState, { url: initState.nodes.list[0].url });
      expect(initState.nodes.list[0].loading).toEqual(true);
  });

  it('checkNodeStatusSuccess', () => {
    const params = {
      el: {
        url: initState.nodes.list[0].url 
      },
      name: 'Thawing Springs'
    };

    checkNodeStatusSuccess(initState, params);
    expect(initState.nodes.list[0].name).toEqual(params.name);
  });

  it('checkNodeStatusFailure', () => {
    checkNodeStatusFailure(initState, { url: initState.nodes.list[0].url });
    expect(initState.nodes.list[0].loading).toEqual(false);
    expect(initState.nodes.list[0].online).toEqual(false);
  });


  it('nodeBlocksResponseSuccess', () => {
    const params = {
      el: {
        url: initState.nodes.list[0].url
      },
      blocks:[{attributes:{index:0,data:"simple-text"}}]
    }
    nodeBlocksResponseSuccess(initState, params);
    expect(initState.nodes.list[0].blocks).toEqual(params.blocks);
  });
  it('nodeBlocksResponseFailure', () => {
    //changing initial value so it is reflected on test
    initState.nodes.list[0].blocks= undefined
    nodeBlocksResponseFailure(initState, { el: initState.nodes.list[0] });
    expect(initState.nodes.list[0].blocks).toEqual([]);
  });


});