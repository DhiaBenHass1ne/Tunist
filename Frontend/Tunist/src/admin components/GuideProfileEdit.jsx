
import { Edit,SimpleForm,TextInput,TextField, DateInput } from 'react-admin'

import { ImageInput, ImageField } from 'react-admin';

const GuideProfileEdit = (props) => {
  return (
    <Edit title="edit guide" {...props}>
      <SimpleForm>
      <TextInput source="guide.bio" />
      <TextInput source="guide.status" />
      
      <TextField source="guide.bio" />
        <TextInput source="guide.price" />
        <TextInput source="guide.languages" />
        <ImageField source="cin" src="url"  />
        
      </SimpleForm>
    </Edit>
  );
};

export default GuideProfileEdit;
