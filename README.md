# MISSING FIELD IDENTIFICATION

## Solution Notes

## ASSUMPTIONS & OBSERVATIONS: 
+ Assuming that an insurance policy can have only a single policy holder
+ Assuming that an insurance policy can have multiple operators
+ In the JSON provided, assuming insurance operators can have multiples, added operatorId to each insurance operator element.
+ Insurance Policy is identified by field: issuer in insurance policy JSON object.
+ Each insurance policy type has a set of unique distinct required fields.
+ Insurance Policy object is validated by checking if the JSON object has values for the set of required fields specific for that Insurance Policy Issuer

## DESIGN:
+ External json files used for policies and its required fields
+ No validation packages used
+ New Policies can be added with its own set of required fields
+ Human readable output: JSON with list of missing required fields and policy info

## CODE RUN IN LOCAL:
+ Add Insurance policy JSON to policies.json
+ Add Required fields for the Insurance policy in policies-requiredfields.json
+ One way to run locally, for instance in VSCODE, install Liveserver extension. Right click on index.html and use 'Open with Live server' option

## APPLICATION FLOW: 
+ Insurance policy json and its required fields are loaded from external json files
+ Function accepts Insurance Policy JSON object as argument 
+ Get the required fields for the insurance policy from policy-requiredfields.json file
+ Check if the required fields are present in the insurance policy object. In JSON, check json elements, objects, arrays etc. 


## FUNCTION:
+ returnListOfRequiredFieldsNotAvailableInInsurancePolicy ( insurancePolicyObject )
+ returns: jsonObject with list of required fields not available

## FILES: 
#### JSON files
•	policies.json
•	policy-requiredFields.json
#### Javascript Files
•	missingfieldidentification.js
•	missingfieldidentification.spec.js [test]

## TESTING: 
+ Tried to use jest to test the function
+ Test needed to validate input json files, before testing the function
 
## Unit Testing environment setup with jest framework

#### Test flow:
- Import function to test
- Provide input to the function
- Define what to expect as output
- Check if function produces the expected output

##### Initialize npm environment
`npm init -y`

##### Install jest
`npm i jest --save-dev`

##### Configure an NPM script for running our tests from the command line
##### Update package.json and configure a script named test for running Jest
`"scripts": {
    "test": "jest"
  },`

##### Run tests
`npm test`

 ## MY COMMENTS: 
+ As mentioned in the problem statement, there are some data issues to be resolved before we can implement a solution.

+ I have not completed the testing within the given 4 hours. 

+ As you mentioned, the challenge of this task is to come up with a solution without,
    - standing up a server
    - endpoint for function
    - using a validation package 

+ Need more time to complete the solution
