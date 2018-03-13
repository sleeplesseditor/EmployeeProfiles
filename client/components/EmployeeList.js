import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './EmployeeDetail';

const EmployeeList = (props) => {
    return (
        <div>
            <div className="employee-list">
                {props.employees.map(employee => <EmployeeDetail />)}
            </div>
        </div>
    );
};

export default createContainer(() => {
    //Subscription
    Meteor.subscribe('employees');

    return { employees: Employees.find({}).fetch() };
}, EmployeeList);