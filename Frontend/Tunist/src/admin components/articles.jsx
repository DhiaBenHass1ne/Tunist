import React from 'react'
import { List, Datagrid, TextField, EmailField, DateField, EditButton, DeleteButton, ArrayField, ImageField } from "react-admin";

export const ArticleList = (props) => {
  return (
<List resource="articles"  {...props}>
        <Datagrid rowClick="edit">
            {/* <TextField source="_id" /> */}
            {/* <TextField source="fName" />
            <TextField source="lName" />  */}
            <TextField source="article.title" />
            <TextField source="article.content" />
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
  )
}

