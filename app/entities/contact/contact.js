import editLayout from './layouts/contact.edit';
import {MODAL_BUTTON_SET_OK_CANCEL, MODAL_BUTTON_SET_YES_NO} from '../../../src/constants';

export default {
    name: "contact",
    displayNameSingular: "Contact",
    displayNamePlural: "Contacts",
    fields: [
        {
            name: "name",
            type: "string",
            displayName: "Name",
            help: "Name should have 10 or less characters",
            invalid: [
                {
                    condition: function (m) {
                        return m.name && m.name.length > 10;
                    },
                    message: 'Name is too big.'
                }
            ]
        },
        {
            name: "email",
            type: "string",
            displayName: "E-mail"
        }
    ],
    layouts: [editLayout],
    clientActions: [],
    search: function (criteria, page, layoutName, context) {
        return context.repository.helpers.paginate(function() { return this.where('name', 'like', `%${criteria}%`) }, page);
    }
};