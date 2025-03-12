'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneStateArray = [];
  const cloneState = { ...state };

  for (const object of actions) {
    if (object.type === 'addProperties' && object.extraData) {
      Object.assign(cloneState, object.extraData);
    }

    if (object.type === 'removeProperties' && object.keysToRemove) {
      for (const key of object.keysToRemove) {
        delete cloneState[key];
      }
    }

    if (object.type === 'clear') {
      for (const property in cloneState) {
        delete cloneState[property];
      }
    }
    cloneStateArray.push({ ...cloneState });
  }

  return cloneStateArray;
}

module.exports = transformStateWithClones;
