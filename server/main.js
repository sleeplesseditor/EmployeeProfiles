import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
    const numberRecords = Employees.find({}).count();
    //Check for pre-existing data in collections
    if (!numberRecords) {
        _.times(5000, () => {
            const { name, email, phone } = helpers.createCard();

            Employees.insert({
                name, email, phone, 
                avatar: image.avatar()
            });
        });
    }

    //Publication – limits to 20 records
    Meteor.publish('employees', function(per_page) {
        return Employees.find({}, { limit: per_page });
    }); 
});