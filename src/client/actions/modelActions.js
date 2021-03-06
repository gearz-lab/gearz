import api from '../api/EntityClientApi';
import {browserHistory} from 'react-router'
export const MODEL_SAVING = 'MODEL_SAVING';
export const MODEL_SAVED = 'MODEL_SAVED';
export const MODEL_SAVE_ERROR = 'MODEL_SAVE_ERROR';
export const MODEL_LOADING = 'MODEL_LOADING';
export const MODEL_LOADED = 'MODEL_LOADED';
export const MODEL_LOAD_ERROR = 'MODEL_LOAD_ERROR';
export const MODEL_CHANGE_SEARCH_CRITERIA = 'MODEL_CHANGE_SEARCH_CRITERIA';
export const MODEL_CHANGE_SELECTION = 'MODEL_CHANGE_SELECTION'

function modelSaving(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: MODEL_SAVING,
        entityName: entityName,
        data: entity
    };
}

function modelSaved(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: MODEL_SAVED,
        entityName: entityName,
        data: entity
    };
}

function modelSaveError(entityName, entity, error) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    if (!error) throw Error('\'error\' should be truthy');
    return {
        type: MODEL_SAVE_ERROR,
        entityName: entityName,
        data: entity,
        error: error
    }
}

export function saveEntity(entityName, entity) {
    return dispatch => {
        dispatch(modelSaving(entityName, entity));
        api.save(entityName, entity)
            .then(r => {
                if (r.data.status == 'success') {
                    dispatch(modelSaved(entityName, r.data.entity));
                    browserHistory.push(`/e/${entityName}/details/${r.data.entity.id}`);
                }
                else {
                    dispatch(modelSaveError(entityName, entity, r.data.error));
                }
            })
            .catch(ex => {
                throw Error(ex)
            });
    };
}

function modelLoading(entityName, data) {
    if (!entityName) throw Error('\'entity\' should be truthy');
    if (!data) throw Error('\'data\' should be truthy');
    return {
        type: MODEL_LOADING,
        data: data,
        entityName: entityName
    };
}

function modelLoaded(entityName, data, elapsed) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!data) throw Error('\'entity\' should be truthy');
    return {
        type: MODEL_LOADED,
        entityName: entityName,
        data: data,
        elapsed: elapsed
    };
}

function modelLoadError(entityName, id, error) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!id) throw Error('\'id\' should be truthy');
    if (!error) throw Error('\'error\' should be truthy');
    return {
        type: MODEL_LOAD_ERROR,
        entityName: entityName,
        data: {id: id},
        error: error
    }
}

export function changeSearchCriteria(inputCriteria) {
    return {
        type: MODEL_CHANGE_SEARCH_CRITERIA,
        inputCriteria: inputCriteria
    }
}

export function changeSelection(selection) {
    if (!selection) throw Error('\'selection\' should be truthy');
    return {
        type: MODEL_CHANGE_SELECTION,
        selection: selection
    }
}

export function loadEntity(entityName, id) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    return dispatch => {
        dispatch(modelLoading(entityName, {id}));
        api.load(entityName, id)
            .then(r => {
                if (r.data.status == 'success') {
                    dispatch(modelLoaded(entityName, r.data.entity));
                }
                else {
                    dispatch(modelLoadError(entityName, id, r.data.error));
                }
            })
            .catch(ex => {
                throw Error(ex)
            });
    };
}

/**
 * Searches entities
 * @export
 * @param {any} entityName
 * @param {any} criteria
 * @param {any} page
 * @param {any} selection
 * @returns
 */
export function searchEntities(entityName, criteria, inputCriteria, page, selection) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    let startTime = new Date();
    return dispatch => {
        dispatch(modelLoading(entityName, {}));
        api.search(entityName, page, criteria)
            .then(r => {
                var endTime = new Date();
                if (r.data.status == 'success') {
                    var elapsed = endTime - startTime;

                    let data = Object.assign(r.data.result, {
                        criteria: criteria,
                        inputCriteria: inputCriteria,
                        selection: selection,
                        page: page
                    });

                    if(selection) {
                        data = Object.assign(data, {
                            selection: selection
                        })
                    };

                    dispatch(modelLoaded(entityName, data, elapsed));
                }
                else {
                    dispatch(modelLoadError(entityName, id, r.data.error));
                }
            })
            .catch(ex => {
                throw Error(ex)
            });
    };
}

export function deleteEntities(entityName, entityIds, onSuccess, onError) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entityIds) throw Error('\'entityIds\' should be truthy');
    return dispatch => {
        dispatch(modelLoading(entityName, {}));
        api.delete(entityName, entityIds)
            .then(r => {
                if(r.data.status == 'success') {
                    onSuccess(r);
                }
                else {
                    onError(r);
                }
            })
            .catch(ex => {
                throw Error(ex); 
            });
    }
}