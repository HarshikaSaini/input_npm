
#React + Typescript

#My Input Library

A reusable React component library for creating dynamic and customizable input fields. Designed for simplicity and scalability, this library can be easily integrated into any React project.




Installation------------------------------------

For bash: npm install my-input-library

For yarn: yarn add my-input-library


Usage:------------------------------------------

Import the ReusableFormComponent into your React project:

import { ReusableFormComponent } from "my-input-library";

The ReusableFormComponent accepts  the  following  props:

Props for Fromfield :
----------------------------------------------------------------------------------
label :      string   ->    Required                                 
Description :  The label text for the input field.

name:     string   ->    Required      
Description :  The name attribute of the input field.

inputType:  text | email | string | radio | checkbox | file | number  ->  required    
Description :  The type of the input field(e.g., text, email,radio,checkbox, file).

placeholder : string	->   No	  
Description :      Placeholder text for the input field.

value:     string	 ->  Required	           
Description  :    Current value of the input field.

onChange  :	function   ->   Required	   
Description  :     Callback function to handle input changes.

option  : arrary of object   ->  Required  
Description   :  Array of labels and value for checkbox and radio 

labelClass :  string  -> No  
Description :  For styling Label on input

mainContainer :  string  ->  No   
Description :  For styling main container 


Props for ReusableFormComponentProps : 
----------------------------------------------------------------------------------

formId: string -> Required.   
Description : Form id for creating every form i.e Unique ID

fields : string -> Required.   
Description  :  Array of FormField i.e Above created object.

onFormChange : callback function  
Description : Function having parameter as  updatedValues: Record<string, string> 

This is based on event driven architecture where we just pass unique event  element. You only need to pass the props in ReusableFormComponentProps  for creating forms. 

for eg : 
 

const App = () =>

 {  
  interface User {  
    name: string;   
    email: string;  
    age: string;  
    favLang: string;  
    favSubject: string[];   
    profile: string | null;  
  }



  const [user, setUser] = useState <"User">     // state object                       
({
    name: "",   
    email: "",  
    age: "",   
    favLang: "",   
    favSubject: [],   
    profile: null,  
  });

  const fields: FormField[] = 
 [
    {
      id: "name",
      label: "User Name",
      inputType: "text",
      value: user.name,
      placeholder: "Enter Your Name",
       onBlur: (value: string) => console.log("First Name Blur:", value),
      onFocus: () => console.log("First Name Focus"),
       className: "input-field",
      style: { marginBottom: "10px" },
      labelClass: "label-class",
    },
    {
      id: "email",
      label: "Email",
      inputType: "email",
      value: user.email,
      placeholder: "Enter your email",
     
      
    },
    {
      id: "age",
      label: "Age",
      inputType: "string",
      value: user.age,
      placeholder: "Enter your age",
      onBlur: (value: string) => console.log("Age Blur:", value),
      labelClass: "label-class",
       className: "input-field",
      style: { marginBottom: "10px" },
    },
    {
      id: "favLang",
      label: "Fav Language",
      inputType: "radio",
      value: user.favLang,
      options: [
        { label: "HTML", value: "html" },
        { label: "JavaScript", value: "js" },
        { label: "CSS", value: "css" },
      ],
    },
    {
      id: "favSubject",
      label: "Fav Subject",
      inputType: "checkbox",
      value: user.favSubject,
      options: [
        { label: "OS", value: "OS" },
        { label: "JavaScript", value: "Js" },
        { label: "Math", value: "Math" },
      ],
    },
    {
      id: "profile",
      label: "Profile Picture",
      inputType: "file",
      value: user.profile,
      accept: "image/*",
    },
  ];

  const handleFormChange = (updatedValues: Record<string, string>) =>
 {
    setUser((prevUser) => ({

      ...prevUser,
      ...updatedValues, // Spread the previous values and update the changed fields
    }));
  };
  console.log("main", user);
  return (
    <>
      <h1>Main</h1>

      <ReusableFormComponent
        formId="registerForm"
        fields={fields}
        onFormChange={handleFormChange}
      />
     
      <Home />
    </>
  );
};


