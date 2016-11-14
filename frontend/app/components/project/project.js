import React from 'react';
import { Link, Match } from 'react-router';


const Project = ({id, name, description, pathname}) => (
    <div>
        <h4>{name}</h4>
        <p>{description}</p>
        <Link to={`${pathname}/${id}`}>go to project...</Link>
    </div>
);

export default Project;
