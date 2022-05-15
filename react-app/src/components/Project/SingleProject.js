import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Avatar from '../Icons/Avatar';

export default function SingleProject() {
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[+projectId]);

    return project && (
        <div className="container">
            <div>
                <strong>Project Id</strong> {project?.id}
            </div>
            <div>
                <strong>Project Name</strong> {project?.name}
            </div>
            <div>
                <strong>Project Key</strong> {project?.key}
            </div>
        </div>
    )
}
