import React from 'react';


const renderField = ({ input, label, type, classFunc, meta: { touched, error } }) => (
    <div className={`form-group ${classFunc({touched, error})}`}>
        <label>{label}</label>
        <input {...input} type={type} placeholder={label} />
        <div className='text-help'>
            { touched && error ? error : '' }
        </div>
    </div>
);

export default renderField;
