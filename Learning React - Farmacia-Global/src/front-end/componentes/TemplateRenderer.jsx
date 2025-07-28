import React from 'react';
import { Template1 } from './templates/Template1';

export const TemplateRenderer = ({ data, index, onEdit, onDelete, isAdmin }) => {
  switch (data.templateType) {
    case 'template1':
      return (
        <Template1
          {...data}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          isAdmin={isAdmin}
        />
      );
    default:
      return null;
  }
};