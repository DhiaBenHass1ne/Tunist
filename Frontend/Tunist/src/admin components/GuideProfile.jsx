import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  EditButton,
  DeleteButton,
  ArrayField,
  ImageField,

} from "react-admin";

export const GuideProfileList = (props) => {
  return (
    <List resource="guides"  {...props}>
      <Datagrid rowClick="edit">
        {/* <TextField source="_id" /> */}
        {/* <TextField source="fName" />
            <TextField source="lName" />  */}
        <ImageField source="cin" src="url"  />
        <TextField source="id" />
        {/* <TextField source="guide.cin.guide.cin" /> */}
        <TextField source="guide.bio" />
        <TextField source="guide.price" />
        <TextField source="guide.languages"/>
        <TextField source="guide.status"/>
        <EditButton basePath='/guides' />
        
        <DeleteButton basePath='/guides' />  
        {/* <TextField source="adress" /> 
            <TextField source="phone" /> 
            <ImageField source="profilePic.url"  /> 
            <DateField source="createdAt"/> 
            <DateField source="updatedAt"/>  */}
        {/* <TextField source = "itemsHistory" /> */}
        {/* <DeleteButton basePath='/users' /> */}
        {/* <TextField source="itemPics" />  */}

        {/* <TextField source="website" />
            <TextField source="company.name" /> */}
      </Datagrid>
    </List>
  );
};


